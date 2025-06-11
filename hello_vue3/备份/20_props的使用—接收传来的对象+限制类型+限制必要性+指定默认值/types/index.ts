// 定义一个接口，用于限制person对象的具体属性,并输出
export interface PersonInter {
    // 定义的数据类型必须小写
    id: string, 
    name: string,
    age: number,
    gender?: string // ?表示可有可无
}

// 一个自定义类型，作用是简化Person.vue页面代码
// export type Persons = Array<PersonInter> 这个是泛型
export type Persons = PersonInter[] // 简写

