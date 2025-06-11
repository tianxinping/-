// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// 房间管理
const rooms = new Map();
const players = new Map();

class Room {
  constructor(id, creator) {
    this.id = id;
    this.players = [creator];
    this.gameState = null;
    this.isGameStarted = false;
  }
  
  addPlayer(player) {
    if (this.players.length < 2) {
      this.players.push(player);
      return true;
    }
    return false;
  }
  
  removePlayer(playerId) {
    this.players = this.players.filter(p => p.id !== playerId);
  }
  
  canStartGame() {
    return this.players.length === 2 && 
           this.players.every(p => p.ready);
  }
}

class Player {
  constructor(id, socketId, name) {
    this.id = id;
    this.socketId = socketId;
    this.name = name;
    this.ready = false;
    this.roomId = null;
  }
}

// WebSocket 连接处理
io.on('connection', (socket) => {
  console.log('新用户连接:', socket.id);
  
  // 创建房间
  socket.on('create_room', (data) => {
    const { roomId, playerId, playerName } = data;
    
    if (rooms.has(roomId)) {
      socket.emit('error', { message: '房间已存在' });
      return;
    }
    
    const player = new Player(playerId, socket.id, playerName);
    const room = new Room(roomId, player);
    
    rooms.set(roomId, room);
    players.set(playerId, player);
    player.roomId = roomId;
    
    socket.join(roomId);
    socket.emit('room_created', { roomId });
  });
  
  // 加入房间
  socket.on('join_room', (data) => {
    const { roomId, playerId, playerName = '玩家2' } = data;
    
    const room = rooms.get(roomId);
    if (!room) {
      socket.emit('error', { message: '房间不存在' });
      return;
    }
    
    if (room.players.length >= 2) {
      socket.emit('error', { message: '房间已满' });
      return;
    }
    
    const player = new Player(playerId, socket.id, playerName);
    room.addPlayer(player);
    players.set(playerId, player);
    player.roomId = roomId;
    
    socket.join(roomId);
    
    socket.emit('room_joined', {
      roomId,
      playerNumber: 2,
      players: room.players.map(p => ({
        id: p.id,
        name: p.name,
        ready: p.ready
      }))
    });
    
    socket.to(roomId).emit('player_joined', {
      players: room.players.map(p => ({
        id: p.id,
        name: p.name,
        ready: p.ready
      }))
    });
  });
  
  // 玩家准备
  socket.on('ready', (data) => {
    const { playerId, ready } = data;
    const player = players.get(playerId);
    
    if (player) {
      player.ready = ready;
      const room = rooms.get(player.roomId);
      
      io.to(player.roomId).emit('player_ready', {
        playerId,
        ready
      });
      
      // 检查是否可以开始游戏
      if (room && room.canStartGame()) {
        room.isGameStarted = true;
        io.to(player.roomId).emit('game_start', {
          gameData: {
            currentPlayer: 1,
            phase: 'poison-selection'
          }
        });
      }
    }
  });
  
  // 游戏动作处理
  socket.on('poison_selected', (data) => {
    const { roomId, playerId, position } = data;
    socket.to(roomId).emit('game_update', {
      update: {
        type: 'poison_selected',
        player: playerId,
        position
      }
    });
  });
  
  socket.on('food_eaten', (data) => {
    const { roomId, playerId, position } = data;
    socket.to(roomId).emit('game_update', {
      update: {
        type: 'food_eaten',
        player: playerId,
        position
      }
    });
  });
  
  // 重新开始游戏
  socket.on('restart_game', (data) => {
    const { roomId } = data;
    io.to(roomId).emit('game_restart');
  });
  
  // 离开房间
  socket.on('leave_room', (data) => {
    const { roomId, playerId } = data;
    handlePlayerLeave(playerId);
  });
  
  // 断开连接
  socket.on('disconnect', () => {
    console.log('用户断开连接:', socket.id);
    
    // 找到断开连接的玩家
    for (const [playerId, player] of players) {
      if (player.socketId === socket.id) {
        handlePlayerLeave(playerId);
        break;
      }
    }
  });
  
  function handlePlayerLeave(playerId) {
    const player = players.get(playerId);
    if (player) {
      const room = rooms.get(player.roomId);
      if (room) {
        room.removePlayer(playerId);
        
        if (room.players.length === 0) {
          rooms.delete(player.roomId);
        } else {
          socket.to(player.roomId).emit('player_disconnected', {
            playerId
          });
        }
      }
      players.delete(playerId);
    }
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});