// 女巫的毒药 - 小游戏简化版（刘海屏适配）
const FOOD_EMOJIS = ['🍎', '🍌', '🍊', '🍇', '🍓', '🥝', '🍑', '🍒', '🥭', '🍍', '🥥', '🍈', '🍉', '🍋', '🥑', '🍅', '🥦', '🥕', '🌽', '🍆', '🥬', '🥒', '🫐', '🍐'];

const PUNISHMENT_OPTIONS = [
  '🎤 唱一首歌',
  '🕺 跳一段舞',
  '🤡 做鬼脸10秒',
  '📱 发朋友圈夸对手',
  '🍭 请对手吃零食',
  '🚀 边做深蹲边说："我是火箭要发射"',
  '🤸 连续完成三个不同的表情包动作',
  '🧠 现场发明一个新成语（如"摸鱼打工人"）',
  '🎭 用哭腔念广告词："挖掘机技术哪家强"',
  '👁️ 盯着手机前置摄像头自拍10秒',
  '🎭 模仿最近流行的短视频梗',
];

class WitchPoisonGame {
  constructor() {
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');

    // 获取系统信息和安全区域
    this.systemInfo = wx.getSystemInfoSync();
    this.safeAreaTop = this.systemInfo.safeArea ? this.systemInfo.safeArea.top : 0;

    // 游戏状态
    this.gridSize = 4;
    this.foods = [];
    this.gamePhase = 'poison-selection';
    this.currentPlayer = 1;
    this.poisonLocations = {
      player1: null,
      player2: null
    };
    this.selectedPoison = null;
    this.poisonSelectionPhase = 1;
    this.eatenFoods = [];
    this.gameOver = false;
    this.gameStartTime = null;
    this.roundNumber = 1;
    this.stats = {
      player1: 0,
      player2: 0,
      totalGames: 0
    };

    // UI状态
    this.currentScreen = 'game';
    this.isPunishmentEnabled = false;
    this.selectedPunishments = {
      player1: '',
      player2: ''
    };
    this.currentPunishmentSelector = 1;
    this.gameOverMessage = '';
    this.gameOverWinner = 0;

    // 界面布局
    this.cellSize = 0;
    this.gridStartX = 0;
    this.gridStartY = 0;
    this.buttons = [];
    this.scrollOffset = 0;
    this.lastTouchY = null;

    this.init();
  }

  init() {
    this.setupCanvas();
    this.loadStats();
    this.generateFoods();
    this.startTimer();
    this.bindEvents();
    this.gameLoop();
  }

  setupCanvas() {
    this.canvas.width = this.systemInfo.windowWidth;
    this.canvas.height = this.systemInfo.windowHeight;

    // 计算网格布局
    const gridAreaSize = Math.min(this.canvas.width * 0.8, this.canvas.height * 0.4);
    this.cellSize = gridAreaSize / this.gridSize;
    this.gridStartX = (this.canvas.width - gridAreaSize) / 2;
    this.gridStartY = this.canvas.height * 0.35;
  }

  updateGridLayout() {
    const gridAreaSize = Math.min(this.canvas.width * 0.8, this.canvas.height * 0.4);
    this.cellSize = gridAreaSize / this.gridSize;
    this.gridStartX = (this.canvas.width - gridAreaSize) / 2;
    this.gridStartY = this.canvas.height * 0.35;
  }

  loadStats() {
    try {
      const stored = wx.getStorageSync('witchPoisonStats');
      if (stored) {
        this.stats = stored;
      }
    } catch (e) {
      console.log('读取统计数据失败:', e);
    }
  }

  saveStats() {
    try {
      wx.setStorageSync('witchPoisonStats', this.stats);
    } catch (e) {
      console.log('保存统计数据失败:', e);
    }
  }

  generateFoods() {
    const totalCells = this.gridSize * this.gridSize;
    this.foods = [];

    for (let i = 0; i < totalCells; i++) {
      this.foods.push({
        emoji: FOOD_EMOJIS[i % FOOD_EMOJIS.length],
        eaten: false,
        isPoison: false,
        selected: false,
        lastEaten: false
      });
    }

    // 洗牌算法
    for (let i = this.foods.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.foods[i].emoji;
      this.foods[i].emoji = this.foods[j].emoji;
      this.foods[j].emoji = temp;
    }
  }

  bindEvents() {
    wx.onTouchStart((e) => {
      const touch = e.touches[0];
      this.handleTouch(touch.clientX, touch.clientY);
    });

    wx.onTouchMove((e) => {
      if (this.currentScreen === 'punishment') {
        const touch = e.touches[0];
        if (this.lastTouchY !== null) {
          this.scrollOffset += (touch.clientY - this.lastTouchY) * 2;
          const maxScroll = Math.max(0, PUNISHMENT_OPTIONS.length * 60 - this.canvas.height * 0.4);
          this.scrollOffset = Math.max(-maxScroll, Math.min(50, this.scrollOffset));
        }
        this.lastTouchY = touch.clientY;
      }
    });

    wx.onTouchEnd(() => {
      this.lastTouchY = null;
    });
  }

  handleTouch(x, y) {
    console.log('Touch at:', x, y, 'Current screen:', this.currentScreen);

    switch (this.currentScreen) {
      case 'game':
        this.handleGameTouch(x, y);
        break;
      case 'settings':
        this.handleSettingsTouch(x, y);
        break;
      case 'punishment':
        this.handlePunishmentTouch(x, y);
        break;
      case 'privacy':
        this.handlePrivacyTouch(x, y);
        break;
      case 'gameOver':
        this.handleGameOverTouch(x, y);
        break;
    }
  }

  handleGameTouch(x, y) {
    if (!this.gameOver) {
      const gridIndex = this.getGridIndex(x, y);
      if (gridIndex !== -1) {
        this.handleFoodClick(gridIndex);
        return;
      }
    }

    this.buttons.forEach(button => {
      if (this.isPointInRect(x, y, button)) {
        console.log('Button clicked:', button.text);
        button.onClick();
      }
    });
  }

  handleSettingsTouch(x, y) {
    this.buttons.forEach(button => {
      if (this.isPointInRect(x, y, button)) {
        console.log('Settings button clicked:', button.text);
        button.onClick();
      }
    });
  }

  handlePunishmentTouch(x, y) {
    this.buttons.forEach(button => {
      if (this.isPointInRect(x, y, button)) {
        console.log('Punishment button clicked:', button.text);
        button.onClick();
      }
    });
  }

  handlePrivacyTouch(x, y) {
    this.buttons.forEach(button => {
      if (this.isPointInRect(x, y, button)) {
        console.log('Privacy button clicked:', button.text);
        button.onClick();
      }
    });
  }

  handleGameOverTouch(x, y) {
    this.buttons.forEach(button => {
      if (this.isPointInRect(x, y, button)) {
        console.log('Game over button clicked:', button.text);
        button.onClick();
      }
    });
  }

  getGridIndex(x, y) {
    const gridAreaSize = this.cellSize * this.gridSize;
    const gridStartX = this.gridStartX;
    const gridStartY = this.gridStartY;

    if (x < gridStartX || x > gridStartX + gridAreaSize ||
      y < gridStartY || y > gridStartY + gridAreaSize) {
      return -1;
    }

    const col = Math.floor((x - gridStartX) / this.cellSize);
    const row = Math.floor((y - gridStartY) / this.cellSize);
    return row * this.gridSize + col;
  }

  isPointInRect(x, y, rect) {
    return x >= rect.x && x <= rect.x + rect.width &&
      y >= rect.y && y <= rect.y + rect.height;
  }

  handleFoodClick(index) {
    if (this.eatenFoods.includes(index)) {
      wx.vibrateShort({
        type: 'heavy'
      });
      return;
    }

    if (this.gamePhase === 'poison-selection') {
      this.selectPoison(index);
    } else if (this.gamePhase === 'eating') {
      this.eatFood(index);
    }
  }

  selectPoison(index) {
    this.selectedPoison = index;
    this.foods.forEach((food, i) => {
      food.selected = i === index;
    });
    wx.vibrateShort({
      type: 'light'
    });
  }

  confirmSelection() {
    if (this.selectedPoison === null) return;

    wx.vibrateShort({
      type: 'medium'
    });

    if (this.poisonSelectionPhase === 1) {
      this.poisonLocations.player1 = this.selectedPoison;
      this.poisonSelectionPhase = 2;
      this.selectedPoison = null;
      this.currentPlayer = 2;
      this.currentScreen = 'privacy';
    } else {
      this.poisonLocations.player2 = this.selectedPoison;
      this.gamePhase = 'eating';
      this.currentPlayer = 1;
      this.selectedPoison = null;
      this.currentScreen = 'game';
    }

    this.foods.forEach(food => {
      food.selected = false;
    });
  }

  eatFood(index) {
    this.foods[index].eaten = true;
    this.foods[index].lastEaten = true;
    this.eatenFoods.push(index);

    wx.vibrateShort({
      type: 'medium'
    });

    if (index === this.poisonLocations.player1) {
      setTimeout(() => {
        this.endGame(2, '玩家1吃到了毒药！玩家2获胜！');
      }, 500);
      return;
    } else if (index === this.poisonLocations.player2) {
      setTimeout(() => {
        this.endGame(1, '玩家2吃到了毒药！玩家1获胜！');
      }, 500);
      return;
    }

    const totalCells = this.gridSize * this.gridSize;
    if (this.eatenFoods.length === totalCells - 2) {
      setTimeout(() => {
        this.endGame(0, '平局！所有安全食物都被吃完了！');
      }, 500);
      return;
    }

    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  }

  endGame(winner, message) {
    this.stopTimer();

    if (winner > 0) {
      this.stats[`player${winner}`]++;
      this.stats.totalGames++;
      wx.vibrateLong();
    } else {
      this.stats.totalGames++;
      wx.vibrateShort({
        type: 'medium'
      });
    }

    this.saveStats();
    this.gameOver = true;
    this.gameOverWinner = winner;
    this.gameOverMessage = message;

    this.foods.forEach((food, index) => {
      food.isPoison = index === this.poisonLocations.player1 || index === this.poisonLocations.player2;
    });

    setTimeout(() => {
      this.currentScreen = 'gameOver';
    }, 1000);
  }

  startTimer() {
    this.gameStartTime = Date.now();
    this.timer = setInterval(() => {
      if (!this.gameOver) {
        // Timer update logic here
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  resetGame() {
    console.log('Reset game called');
    this.stopTimer();

    this.gamePhase = 'poison-selection';
    this.currentPlayer = 1;
    this.poisonLocations = {
      player1: null,
      player2: null
    };
    this.selectedPoison = null;
    this.poisonSelectionPhase = 1;
    this.eatenFoods = [];
    this.gameOver = false;
    this.roundNumber++;
    this.currentScreen = 'game';
    this.selectedPunishments = {
      player1: '',
      player2: ''
    };

    this.generateFoods();
    this.updateGridLayout();
    this.startTimer();

    wx.vibrateShort({
      type: 'light'
    });
  }

  // 设置相关方法
  openSettings() {
    this.currentScreen = 'settings';
    wx.vibrateShort({
      type: 'light'
    });
  }

  closeSettings() {
    this.currentScreen = 'game';
    wx.vibrateShort({
      type: 'light'
    });
  }

  changeDifficulty(size) {
    if (this.gamePhase === 'poison-selection' && this.poisonSelectionPhase === 1) {
      this.gridSize = size;
      this.resetGame();
    }
  }

  togglePunishment() {
    this.isPunishmentEnabled = !this.isPunishmentEnabled;
    wx.vibrateShort({
      type: 'light'
    });

    if (this.isPunishmentEnabled && this.gamePhase === 'poison-selection' && this.poisonSelectionPhase === 1) {
      this.startPunishmentSelection();
    }
  }

  startPunishmentSelection() {
    this.currentScreen = 'punishment';
    this.currentPunishmentSelector = 1;
    this.selectedPunishments = {
      player1: '',
      player2: ''
    };
    this.scrollOffset = 0;
  }

  selectPunishment(punishment) {
    const targetPlayer = this.currentPunishmentSelector === 1 ? 'player2' : 'player1';
    this.selectedPunishments[targetPlayer] = punishment;
    wx.vibrateShort({
      type: 'light'
    });
  }

  confirmPunishment() {
    const targetPlayer = this.currentPunishmentSelector === 1 ? 'player2' : 'player1';
    const selectedPunishment = this.selectedPunishments[targetPlayer];

    if (!selectedPunishment) {
      wx.vibrateShort({
        type: 'heavy'
      });
      return;
    }

    if (this.currentPunishmentSelector === 1) {
      this.currentPunishmentSelector = 2;
    } else {
      this.currentScreen = 'game';
      wx.vibrateShort({
        type: 'medium'
      });
    }
  }

  skipPunishment() {
    this.currentScreen = 'game';
    this.isPunishmentEnabled = false;
    this.selectedPunishments = {
      player1: '',
      player2: ''
    };
    wx.vibrateShort({
      type: 'light'
    });
  }

  clearStats() {
    this.stats = {
      player1: 0,
      player2: 0,
      totalGames: 0
    };
    this.saveStats();
    wx.vibrateShort({
      type: 'medium'
    });
  }

  // 绘制方法
  draw() {
    // 清空画布
    this.ctx.fillStyle = '#667eea';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    switch (this.currentScreen) {
      case 'game':
        this.drawGame();
        break;
      case 'settings':
        this.drawSettings();
        break;
      case 'punishment':
        this.drawPunishmentSelection();
        break;
      case 'privacy':
        this.drawPrivacyScreen();
        break;
      case 'gameOver':
        this.drawGameOver();
        break;
    }
  }

  drawGame() {
    this.drawHeader();
    this.drawStatus();
    this.drawGrid();
    this.drawGameButtons();
  }

  drawHeader() {
    // 计算安全的顶部位置 - 避开刘海屏
    const safeTop = Math.max(this.safeAreaTop + 10, 20);

    // 标题
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 32px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('🧙‍♀️ 女巫的毒yao', this.canvas.width / 2, safeTop + 50);

    // 统计信息
    this.ctx.font = '20px sans-serif';
    this.ctx.fillText(`第${this.roundNumber}局  🏆 ${this.stats.player1} : ${this.stats.player2}`, this.canvas.width / 2, safeTop + 85);

    if (this.isPunishmentEnabled) {
      this.ctx.fillText('🎲 惩罚模式', this.canvas.width / 2, safeTop + 85);
    }

    // 顶部按钮 - 使用安全区域
    const topButtons = [];
    const buttonY = safeTop;

    // 设置按钮
    topButtons.push({
      x: this.canvas.width - 120,
      y: buttonY,
      width: 50,
      height: 30,
      text: '⚙️',
      onClick: () => this.openSettings()
    });

    // 惩罚模式按钮
    topButtons.push({
      x: this.canvas.width - 180,
      y: buttonY,
      width: 50,
      height: 30,
      text: '🎲',
      onClick: () => this.togglePunishment()
    });

    topButtons.forEach(button => {
      this.ctx.fillStyle = this.isPunishmentEnabled && button.text === '🎲' ? '#52c41a' : '#ffffff';
      this.ctx.fillRect(button.x, button.y, button.width, button.height);
      this.ctx.strokeStyle = '#333333';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(button.x, button.y, button.width, button.height);

      this.ctx.fillStyle = '#333333';
      this.ctx.font = '16px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
    });

    this.buttons = topButtons;
  }

  drawStatus() {
    let statusText = '';
    if (this.gameOver) {
      statusText = '游戏结束 - 查看结果';
    } else if (this.gamePhase === 'poison-selection') {
      statusText = this.poisonSelectionPhase === 1 ?
        '🧙‍♀️ 玩家1 请选择你的毒药位置' :
        '🧙‍♂️ 玩家2 请选择你的毒药位置';
    } else {
      const remainingFoods = this.gridSize * this.gridSize - this.eatenFoods.length - 2;
      statusText = `🍽️ 玩家${this.currentPlayer} 的回合 - 剩余 ${remainingFoods} 个安全食物`;
    }

    this.ctx.fillStyle = '#ff4d4f';
    this.ctx.font = 'bold 24px sans-serif';
    this.ctx.textAlign = 'center';

    // 状态文字位置也考虑安全区域
    const statusY = Math.max(this.safeAreaTop + 130, 150);
    this.ctx.fillText(statusText, this.canvas.width / 2, statusY);
  }

  drawGrid() {
    for (let i = 0; i < this.foods.length; i++) {
      const row = Math.floor(i / this.gridSize);
      const col = i % this.gridSize;
      const x = this.gridStartX + col * this.cellSize;
      const y = this.gridStartY + row * this.cellSize;

      const food = this.foods[i];

      // 绘制背景
      if (food.eaten) {
        this.ctx.fillStyle = '#d9d9d9';
      } else if (food.isPoison) {
        this.ctx.fillStyle = '#ff4d4f';
      } else if (food.selected) {
        this.ctx.fillStyle = '#52c41a';
      } else {
        this.ctx.fillStyle = '#ffd8bf';
      }

      this.ctx.fillRect(x + 2, y + 2, this.cellSize - 4, this.cellSize - 4);

      // 绘制边框
      this.ctx.strokeStyle = food.selected ? '#52c41a' : '#faad14';
      this.ctx.lineWidth = 3;
      this.ctx.strokeRect(x + 2, y + 2, this.cellSize - 4, this.cellSize - 4);

      // 绘制食物或X
      this.ctx.fillStyle = '#000000';
      this.ctx.font = `${this.cellSize * 0.4}px sans-serif`;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';

      const emoji = food.eaten ? '❌' : food.emoji;
      this.ctx.fillText(emoji, x + this.cellSize / 2, y + this.cellSize / 2);
    }
  }

  drawGameButtons() {
    const gameButtons = [];

    // 重置按钮
    gameButtons.push({
      x: 50,
      y: this.canvas.height - 80,
      width: 100,
      height: 40,
      text: '🔄重置',
      onClick: () => this.resetGame()
    });

    if (this.gameOver) {
      gameButtons.push({
        x: this.canvas.width - 150,
        y: this.canvas.height - 80,
        width: 100,
        height: 40,
        text: '🎉查看结果',
        onClick: () => {
          console.log('Show game over results');
          this.currentScreen = 'gameOver';
        }
      });
    } else if (this.gamePhase === 'poison-selection' && this.selectedPoison !== null) {
      gameButtons.push({
        x: this.canvas.width - 150,
        y: this.canvas.height - 80,
        width: 100,
        height: 40,
        text: '✅确认',
        onClick: () => this.confirmSelection()
      });
    }

    // 绘制按钮
    gameButtons.forEach(button => {
      this.ctx.fillStyle = '#52c41a';
      this.ctx.fillRect(button.x, button.y, button.width, button.height);

      this.ctx.strokeStyle = '#389e0d';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(button.x, button.y, button.width, button.height);

      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 16px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
    });

    this.buttons = this.buttons.concat(gameButtons);
  }

  drawSettings() {
    // 半透明背景
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 设置面板
    const panelWidth = this.canvas.width * 0.8;
    const panelHeight = this.canvas.height * 0.7;
    const panelX = (this.canvas.width - panelWidth) / 2;
    const panelY = (this.canvas.height - panelHeight) / 2;

    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(panelX, panelY, panelWidth, panelHeight);
    this.ctx.strokeStyle = '#333333';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(panelX, panelY, panelWidth, panelHeight);

    // 标题
    this.ctx.fillStyle = '#333333';
    this.ctx.font = 'bold 28px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('⚙️ 游戏设置', panelX + panelWidth / 2, panelY + 50);

    // 难度选择
    this.ctx.font = 'bold 20px sans-serif';
    this.ctx.fillText('游戏难度', panelX + panelWidth / 2, panelY + 100);

    const difficultyButtons = [{
        size: 3,
        text: '3×3',
        x: panelX + 50,
        y: panelY + 120
      },
      {
        size: 4,
        text: '4×4',
        x: panelX + panelWidth / 2 - 40,
        y: panelY + 120
      },
      {
        size: 5,
        text: '5×5',
        x: panelX + panelWidth - 130,
        y: panelY + 120
      }
    ];

    const settingsButtons = [];

    difficultyButtons.forEach(button => {
      const isActive = this.gridSize === button.size;
      this.ctx.fillStyle = isActive ? '#52c41a' : '#f0f0f0';
      this.ctx.fillRect(button.x, button.y, 80, 40);
      this.ctx.strokeStyle = isActive ? '#389e0d' : '#d9d9d9';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(button.x, button.y, 80, 40);

      this.ctx.fillStyle = isActive ? '#ffffff' : '#333333';
      this.ctx.font = 'bold 16px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(button.text, button.x + 40, button.y + 20);

      settingsButtons.push({
        x: button.x,
        y: button.y,
        width: 80,
        height: 40,
        text: button.text,
        onClick: () => this.changeDifficulty(button.size)
      });
    });

    // 惩罚模式开关
    this.ctx.fillStyle = '#333333';
    this.ctx.font = 'bold 20px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('惩罚模式', panelX + panelWidth / 2, panelY + 200);

    const punishmentBtn = {
      x: panelX + panelWidth / 2 - 60,
      y: panelY + 220,
      width: 120,
      height: 40,
      text: this.isPunishmentEnabled ? '🎲 开启' : '⭕ 关闭',
      onClick: () => this.togglePunishment()
    };

    this.ctx.fillStyle = this.isPunishmentEnabled ? '#52c41a' : '#f0f0f0';
    this.ctx.fillRect(punishmentBtn.x, punishmentBtn.y, punishmentBtn.width, punishmentBtn.height);
    this.ctx.strokeStyle = this.isPunishmentEnabled ? '#389e0d' : '#d9d9d9';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(punishmentBtn.x, punishmentBtn.y, punishmentBtn.width, punishmentBtn.height);

    this.ctx.fillStyle = this.isPunishmentEnabled ? '#ffffff' : '#333333';
    this.ctx.font = 'bold 16px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(punishmentBtn.text, punishmentBtn.x + punishmentBtn.width / 2, punishmentBtn.y + punishmentBtn.height / 2);

    settingsButtons.push(punishmentBtn);

    // 底部按钮
    const bottomButtons = [{
        x: panelX + 50,
        y: panelY + panelHeight - 60,
        width: 100,
        height: 40,
        text: '返回',
        onClick: () => this.closeSettings()
      },
      {
        x: panelX + panelWidth - 150,
        y: panelY + panelHeight - 60,
        width: 100,
        height: 40,
        text: '清除统计',
        onClick: () => this.clearStats()
      }
    ];

    bottomButtons.forEach(button => {
      this.ctx.fillStyle = button.text === '清除统计' ? '#ff4d4f' : '#1890ff';
      this.ctx.fillRect(button.x, button.y, button.width, button.height);
      this.ctx.strokeStyle = button.text === '清除统计' ? '#cf1322' : '#096dd9';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(button.x, button.y, button.width, button.height);

      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 16px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
    });

    this.buttons = settingsButtons.concat(bottomButtons);
  }

  drawPunishmentSelection() {
    // 半透明背景
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 面板
    const panelWidth = this.canvas.width * 0.9;
    const panelHeight = this.canvas.height * 0.8;
    const panelX = (this.canvas.width - panelWidth) / 2;
    const panelY = (this.canvas.height - panelHeight) / 2;

    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(panelX, panelY, panelWidth, panelHeight);

    // 标题
    this.ctx.fillStyle = '#333333';
    this.ctx.font = 'bold 24px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('🎲 选择对手的惩罚', panelX + panelWidth / 2, panelY + 40);

    const playerText = this.currentPunishmentSelector === 1 ? '🧙‍♀️ 玩家1' : '🧙‍♂️ 玩家2';
    this.ctx.font = '18px sans-serif';
    this.ctx.fillText(`${playerText} 为对手选择惩罚`, panelX + panelWidth / 2, panelY + 70);

    // 惩罚选项
    const targetPlayer = this.currentPunishmentSelector === 1 ? 'player2' : 'player1';
    const selectedPunishment = this.selectedPunishments[targetPlayer];

    const punishmentButtons = [];
    const startY = panelY + 100 + this.scrollOffset;
    const itemHeight = 50;

    PUNISHMENT_OPTIONS.forEach((punishment, index) => {
      const y = startY + index * itemHeight;
      const isSelected = selectedPunishment === punishment;

      // 只绘制在可见区域内的选项
      if (y + itemHeight > panelY + 100 && y < panelY + panelHeight - 100) {
        this.ctx.fillStyle = isSelected ? '#52c41a' : '#f8f9fa';
        this.ctx.fillRect(panelX + 20, y, panelWidth - 40, itemHeight - 5);
        this.ctx.strokeStyle = isSelected ? '#389e0d' : '#dee2e6';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(panelX + 20, y, panelWidth - 40, itemHeight - 5);

        this.ctx.fillStyle = isSelected ? '#ffffff' : '#495057';
        this.ctx.font = '16px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(punishment, panelX + panelWidth / 2, y + itemHeight / 2);

        punishmentButtons.push({
          x: panelX + 20,
          y: y,
          width: panelWidth - 40,
          height: itemHeight - 5,
          text: punishment,
          onClick: () => this.selectPunishment(punishment)
        });
      }
    });

    // 底部按钮
    const bottomButtons = [{
        x: panelX + 30,
        y: panelY + panelHeight - 50,
        width: 80,
        height: 35,
        text: '跳过',
        onClick: () => this.skipPunishment()
      },
      {
        x: panelX + panelWidth - 110,
        y: panelY + panelHeight - 50,
        width: 80,
        height: 35,
        text: '确认',
        onClick: () => this.confirmPunishment()
      }
    ];

    bottomButtons.forEach(button => {
      this.ctx.fillStyle = button.text === '跳过' ? '#ff4d4f' : '#52c41a';
      this.ctx.fillRect(button.x, button.y, button.width, button.height);

      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 14px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
    });

    this.buttons = punishmentButtons.concat(bottomButtons);
  }

  drawPrivacyScreen() {
    // 半透明背景
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 提示文字
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 32px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('🔒 隐私保护', this.canvas.width / 2, this.canvas.height / 2 - 60);

    this.ctx.font = '20px sans-serif';
    this.ctx.fillText('请玩家1暂时回避', this.canvas.width / 2, this.canvas.height / 2 - 20);
    this.ctx.fillText('玩家2正在选择毒药位置', this.canvas.width / 2, this.canvas.height / 2 + 10);
    this.ctx.fillText('选择完成后点击确认按钮继续', this.canvas.width / 2, this.canvas.height / 2 + 40);

    // 继续按钮
    const continueBtn = {
      x: this.canvas.width / 2 - 80,
      y: this.canvas.height / 2 + 80,
      width: 160,
      height: 50,
      text: '👀 我已回避，继续',
      onClick: () => {
        this.currentScreen = 'game';
      }
    };

    this.ctx.fillStyle = '#52c41a';
    this.ctx.fillRect(continueBtn.x, continueBtn.y, continueBtn.width, continueBtn.height);

    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 16px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(continueBtn.text, continueBtn.x + continueBtn.width / 2, continueBtn.y + continueBtn.height / 2);

    this.buttons = [continueBtn];
  }

  drawGameOver() {
    // 半透明背景
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 面板
    const panelWidth = this.canvas.width * 0.85;
    const panelHeight = this.canvas.height * 0.6;
    const panelX = (this.canvas.width - panelWidth) / 2;
    const panelY = (this.canvas.height - panelHeight) / 2;

    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(panelX, panelY, panelWidth, panelHeight);
    this.ctx.strokeStyle = '#52c41a';
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(panelX, panelY, panelWidth, panelHeight);

    // 游戏结束信息
    const title = this.gameOverWinner === 0 ? '🤝 平局！' : `🎉 玩家${this.gameOverWinner} 获胜！`;

    this.ctx.fillStyle = '#4a5568';
    this.ctx.font = 'bold 32px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(title, panelX + panelWidth / 2, panelY + 80);

    this.ctx.font = '20px sans-serif';
    this.ctx.fillStyle = '#666666';
    this.ctx.fillText(this.gameOverMessage, panelX + panelWidth / 2, panelY + 130);

    // 惩罚信息
    if (this.isPunishmentEnabled && this.gameOverWinner > 0) {
      const loser = this.gameOverWinner === 1 ? 2 : 1;
      const punishment = this.selectedPunishments[`player${loser}`];
      if (punishment) {
        this.ctx.fillStyle = '#ff4d4f';
        this.ctx.font = 'bold 18px sans-serif';
        this.ctx.fillText(`🎲 玩家${loser}的惩罚：`, panelX + panelWidth / 2, panelY + 170);
        this.ctx.fillText(punishment, panelX + panelWidth / 2, panelY + 195);
      }
    }

    // 统计信息
    this.ctx.fillStyle = '#52c41a';
    this.ctx.font = '16px sans-serif';
    this.ctx.fillText(`🏆 总战绩 - 玩家1: ${this.stats.player1} | 玩家2: ${this.stats.player2}`, panelX + panelWidth / 2, panelY + 240);
    this.ctx.fillText(`🔄 局数: ${this.roundNumber}`, panelX + panelWidth / 2, panelY + 265);

    // 按钮
    const gameOverButtons = [{
        x: panelX + 50,
        y: panelY + panelHeight - 60,
        width: 120,
        height: 40,
        text: '🔄 再来一局',
        onClick: () => {
          console.log('Play again clicked from game over');
          this.resetGame();
        }
      },
      {
        x: panelX + panelWidth - 170,
        y: panelY + panelHeight - 60,
        width: 120,
        height: 40,
        text: '📋 查看棋盘',
        onClick: () => {
          console.log('View board clicked');
          this.currentScreen = 'game';
        }
      }
    ];

    gameOverButtons.forEach(button => {
      this.ctx.fillStyle = button.text.includes('再来一局') ? '#52c41a' : '#1890ff';
      this.ctx.fillRect(button.x, button.y, button.width, button.height);

      this.ctx.strokeStyle = button.text.includes('再来一局') ? '#389e0d' : '#096dd9';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(button.x, button.y, button.width, button.height);

      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 16px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
    });

    this.buttons = gameOverButtons;
  }

  gameLoop() {
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }
}

// 启动游戏
const game = new WitchPoisonGame();