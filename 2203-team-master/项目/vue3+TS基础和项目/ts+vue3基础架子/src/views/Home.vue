<template>
  <div>
    <h5>ts基础语法知识,审查元素看源代码</h5>
  </div>
</template>

<script lang="ts" setup>
//js中类型随意更改，不会报错，解释性语言,弱类型语言,只能在运行时发现错误。ts是预编译类型,强类型语言，可以提前发现错误。ts更多的是在传参时,或接口封装时，用ts类型限制
//js随意更改类型，或者重复，只能在运行后发现错误
//    var a='a'
//     a=2;
// var a='c'
// console.log(13,a); 

 //一.ts基本类型定义
/*// JS的八种内置类型 基本类型: string('aa','bb'),number(11,22),boolean(true,false),null,undefined,symbol  引用类型:Array [],Object {}

//1.string类型
let str: string = "aa";
str = "33";
console.log(16, str);

//2.number 类型
let nums: number = 33;
console.log(nums);

//3.boolean 类型
let b2: boolean = true;
b2 = false;
console.log(b2);
// 4.Array数组类型:类型[]-在TypeScript开发中, 数组内最好存放的数据类型是固定的(string)
// 数组类型的定义有两种方式
// 数组类型的定义有两种方式
let names: string[] = ["a", "b"]; //推荐使用这种
let names2: Array<string> = ["c", "d"];

names.push("s"); //填加其它类型会报错
names2.push("s");
console.log(names, names2);

//5.tuple元组类型-多种元素的组合x:[string,number,等等]
// 5.1.先看下数组的弊端-数组中通常建议存放相同类型的元素，不同类型的元素是不推荐放在数组中。（可以放在对象或者元组中）
// let arr5:any[]=['aaa',2,3] //不推荐什么地方都用any,放不同类型
let arr5: string[] = ["aaa", "bb"];
console.log(arr5);

//5.2.放元组里-元组中特点每个元素都有自己特性的类型，根据索引值获取到的值可以确定对应的类型；
let arr6: [string, number] = ["aa", 22];
console.log("元组", arr6[0]);

//5.3.不同类型，也可放对象里
let obj = {
  a: 1,
  b: "2",
};
console.log(obj.a);

//6.Object类型-对象类型，也就是除number，string，boolean，symbol，null或undefined之外的类型
function create(obj: Object) {
  console.log(obj);
}
create({ key: 1 }); //{key:1}
// create(null); // 会提醒报错
// create(11); // 会提醒报错

//7.undefined 和 null 是两个基本数据类型
let n1: null = null;
let n2: undefined = undefined;
console.log(n1, n2);

//8.枚举类型enum-这个世界有很多值是多个并且是固定的，比如：一年的季节：春、夏、秋、冬 ，有四个结果。这种变量的结果是固定的几个数据时，就是我们使用枚举类型的最好时机
enum Color {
  red,
  yellow,
  blue,
}
let col = Color.red;
console.log("枚举", col); //默认情况下，索引从0开始

//也可自定义编号
enum Color2 {
  yello = 1,
  pink,
  red,
}
let c = Color2.pink;
console.log(77, c); //2 索引值

//枚举类型提供的一个便利是你可以由枚举的值得到它的名字
enum Color3 {
  red,
  yellow,
  blue,
}
let d = Color3[0];
console.log(82, d); //red

//9.泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
//表现形式：由尖括号包裹<T>, 其中 T 代表 Type，在定义泛型时通常用作第一个类型变量名称。但实际上 T 可以用任何有效名称代替。除了 T 之外，以下是常见泛型变量代表的意思： K（Key）：表示对象中的键类型； V（Value）：表示对象中的值类型； E（Element）：表示元素类型。

//如:以下在调用时返回string或number类型等不特定的数据-可以用泛型来代替
//简单版写法
// function getData1(arg1: T){
//   return arg1;
// }

//规范的泛型
function getData1<T>(arg1: T): T {
  return arg1;
}
//在调用时传任何类型都可以
console.log("泛型", getData1(9));
console.log(getData1("9"));
console.log(getData1(true));

// 泛型也可以传入多个值
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

console.log(swap(["string", 123])); 
 */
//  --------------------------------------------------------

//二.类型推论(自动推导)，联合类型|，类型别名type，交叉类型&

//3.类型推论
// 什么是类型推论?TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。
/* 
let str3 = "类型推论";
// str3=7  // 以下代码虽然没有指定类型，但是会在编译的时候报错
console.log("类型推论", str3);

// 3.2 推论any类型。如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：
let str4;
str4 = "a";
str4 = 4; //输出最后一个
console.log(str4);

// 4.1 联合类型-联合类型表示取值可以为多种类型中的一种，使用 `|` 分隔每个类型
let numStr: string|number='';
numStr = "seven";
numStr = 2;
// numStr=true //以下是错误的,因为上面已经定义过类型，不能是其他类型
console.log("联合类型", numStr);

// 4.2 访问联合类型的属性或方法-当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型里共有的属性或方法
function getNumStr(num2: string | number) {
  // return num2.length  //报错
  return num2.toString(); //访问共有属性
}
console.log(129, getNumStr(22)); 

//4.3 类型别名type，就是给类型起一个别名，让它可以更方便的被重用

// 支持联合类型
type StrOrNumber = string | number
let type1: StrOrNumber = '123'
type1 = 123
console.log('161类型别名', type1); 

// 字符串字面量
type strTest = 'Up' | 'Down' | 'Left' | 'Right'
let type2: strTest = 'Up'
console.log('161类型别名', type2); 


//4.4 交叉类型&——它的应用场景更多的是将多个接口类型合并成一个类型，从而实现等同接口继承的效果，也就是所谓的合并接口类型
interface IName  {
  name: string
}
type IPerson = IName & { age: number }
let type3: IPerson = { name: 'hello', age: 12}
console.log('175合并接口类型', type3); 
 */

//  --------------------------------------------------------

// 三.interface 接口-在ts中,接口起到一种限制和规范的作用。我们使用接口来定义对象的类型
//  注意：1.首字母要大写   2.结束是;结尾
/*  //1.1接口定义
interface Iuser {
  name: string;
  age: number;
}
//1.2接口使用-增加变量和减少变量是不允许的，改变属性的数据类型是不允许的；可见，赋值的时候，**变量的形状必须和接口的形状保持一致
let tom: Iuser = {
  name: "接口",
  age: 15, //如果只给一个，会报错缺少属性。类型必须得跟定义的类型一致
  // sex:0, //类型与定义的保持一致，不能多，也不能少属性
};

//1.3 接口可选属性-有时接口里的属性可有可无，可定义为可选属性。类型的冒号前加上英文的问号(?)
interface Iuser2 {
  name: string;
  age: number;
  sex?: string; //定义可选属性
  //   [prop:string]:string|number  //  [propName: string] 定义任意属性。一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集。意思是其它类型都必须跟该类型保持一致，否则会报错,如果有多个不同类型可用联合类型填加
}
let tom2: Iuser2 = {
  name: "接口",
  age: 15,
};

//1.4 只读属性-有时候我们希望对象中的一些字段只能在创建的时候被赋值，后续不能在被更改。可用只读属性
interface Iuser3 {
  readonly id: number;
  name: string;
  age: number;
}
let tom3: Iuser3 = {
  id: 11,
  name: "接口",
  age: 15,
};
//  tom3.id=22 // 报错： 无法分配到 "id" ，因为它是只读属性
tom.name = "测试";
console.log("接口只读属性", tom3);   */

//1.5 可索引接口-对数组、对象的访问约束（不常用）
// 数组定义
// interface Iarr {
//   [prop: number]: string;
// }
// // 使用接口约束数组
// let arr: Iarr = ["1", "2"];
// console.log(arr[1]);

// //对象定义
// interface Iobj {
//   [prop: string]: string;
// }

// let json: Iobj = {
//   a: "1",
// };
// console.log(json["a"]);

//  --------------------------------------------------------

//四.ts中的函数用法
/*  //1.函数定义: function 方法名() : 返回类型
function run(): string{
  return "aa";
}

console.log(run());

//2.ts函数传参
function run1(user: string, age: number): string {
  return `${user},${age}`;
}

console.log(run1("bb", 11));

//3.void没有返回值的方法
function run3(): void {
  console.log("aa");
}

run3();

//4.方法的可选参数-!!!注意可选参数必须配置到参数的最后面
function run4(user: string,age?:number): string {
  if (age) {
    return `${user},${age}`;
  } else {
    return `${user}`;
  }
}

console.log(run4("dd", 11));
console.log(run4("dd"));

//5.默认参数-我们允许给函数的参数添加默认值，ts会将添加了默认值的参数识别为可选参数，此时就不受「可选参数必须接在必需参数后面」的限制了,放到哪里都可以
function num(a: number, b: number = 1): number {
  return a + b;
}
console.log(335,num(2,3)); //3

//6.剩余参数(三点运算)-假如传入的参数个数不确定时，可用剩余参数
function num2(a: number, ...args:number[]): number {
  let total = a;
  args.forEach((item) => {
    total += item;
  });
  return total;
}
console.log(num2(1, 2)); //3
console.log(num2(1, 2, 3)); //6

//7.函数重载——指同名但是不同参数的函数方法，作用是可实现多种功能.函数重载允许一个函数接受不同数量或类型的参数时，作出不同的处理；也就是说通过为同一个函数提供多个函数类型定的义来实现多种功能。
//函数重载，需要重复定义多次函数，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示.
function run5(user: string): string;
function run5(age: number): number;

function run5(str: any): any {
  if (typeof str === "string") {
    return `我的名字是${str}`;
  } else {
    return `我的年龄是${str}`;
  }
}

console.log(run5("ee"));
console.log(run5(18));  */
 
//  --------------------------------------------------------

//五.断言
 // 1.1类型断言as,字面理解就是可以用来手动指定一个值的类型——有时候ts无法获取具体的类型信息就要访问其中一个类型，这时我们就需要使用类型断言as或者断言另一种形式尖括号<类型>。推荐使用as

  // function getLen(str:string|number){
  //     return str.length;   //这时会报错-因为number类型没有length属性而报错
  // }
  // console.log(getLen('aa'))

//解决办法
// function getLen1(str: string | number) {
//   return (str as string).length; //用断言as,
//   // return (<string>str).length  //断言另一种形式尖括号<类型>
//   // return (str as boolean).length  //注意：类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的。会报错
// }
// console.log(getLen1("aa")); 

//1.2 使用断言注意问题-类型断言应该少用

//2.函数约束
//2.1 js中使用函数
/* function addNum2(x: number, y: number) {
  return x + y;
}
console.log(addNum2(1, 2));

//2.2 ts中使用函数。TS中，一个函数要有输入（参数）和输出（返回值），我们在ts内要对其输入和输出进行约束
// 对输入（参数）的约束是在每个参数后面写上 :类型
// 对输出（返回值）的约束是在函数名()后写上 :类型
function addNum(x: number, y: number): number {
  return x + y;
}
// addNum() // 报错： 应有 2 个参数，但获得 0 个。
// addNum(1) //报错： 应有 2 个参数，但获得 1 个。
// addNum(1,2,3) //报错： 应有 2 个参数，但获得 3 个。
addNum(1, 2);

//2.3 注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>  。在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。*
// var addNum1:(x:number,y:number)=>number = function(x:number,y:number):number{
//     return x + y
// }

// addNum1(1,2) */

//2.4 接口+表达式约束-采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变
  //定义接口
  //  interface Ifun {
  //       (x:number,y:number):number
  //   }
  //   // 接口约束函数
  //   var addNum4:Ifun = function(x:number,y:number):number{
  //       return x + y
  //   }
  //   addNum4(1,2)


//  --------------------------------------------------------

//六.类的定义
//1.ts中定义类，与原生js差不多。——!!! 注意ts在声明类的时候，需要对类的属性的数据类型进行约束
 class Person {
  name1: string; //前面省略的public关键词
  constructor(name:string) {
    this.name1 = name;
  }
  run(): void {
    console.log(`${this.name1}在工作`);
  }
}
let p = new Person("张三");
console.log(386, p.name1);
p.run(); 

//2.继承
 class person1 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  run(): string {
    return `${this.name}在跑步`;
  }
}

let p1 = new person1("王吉");
console.log(p1.run());

// 继承
class Web extends person1 {
  constructor(name: string) {
    super(name);
  }
}
let w = new Web("李四");
console.log(w.run());  


//3. ts提供了很多种修饰符：
// readonly    只读
// public(默认的)： 公有 在类里面、子类类外边都可以访问
// protected：在类里面、子类里面可以访问、在类外部无法访问
// private：在类里面可以访问、子类、类外部没法访问

//demo0  演示readonly用法   它是只读的，外部不能修改
/* 
interface Iobj{
    readonly a:number,
    b:number,
}
let obj:Iobj={
    a:1,
    b:2,
}

//没用readonly时，可以这样更改a的值；用了readonly后，会报错,因为此时a为只读，不可修改
// obj.a=555
console.log('readonly',obj); */


//demo1  演示  public,protected用法
/* 
// public  	    公开的，在任何地方都可以访问
//protected 	受保护的，只能在类里面、子类里面可以访问、在类外部无法访问

class Person1{
	public userAge:number;  //pubic 是默认的，不写也是
	protected userName:string;
	constructor( name:string, age:number ){
		this.userName = name;
		this.userAge = age;
	}
	run( ):string {
		return `姓名：${this.userName},年龄：${this.userAge} `   //在类里面可以访问
	}
 
}
let p1=new Person1('张三',123)
//访问public 不会报错
// p1.userAge=456;
//此时访问userName会报错，因为是protected
//  console.log(p1.userName);
//此时运行ok,因为run是类内部的
console.log('public',p1.run()) */
 
//demo2   演示protected，受保护的，只能在类里面、子类里面可以访问、在类外部无法访问
/* class Person2{
  protected userName2:string;
  constructor( name:string){
		this.userName2 = name;
	}
}
class Child extends Person2{
   constructor( name:string){
	     super(name)
  	}
    //子类内部，可以访问protected
    run(){
        return this.userName2
    }
}
let c2=new Child('李四')
//类外面 ，访问会报错
// console.log(c2.userName2);
//通过子类的函数访问父类受保护的属性是OK的
console.log('protected',c2.run()) */
 
 //demo3  演示private 	私有的，在当前类的内部使用
/* class Person3{
   private userName3:string;
  constructor( name:string){
		this.userName3= name;
	}
}
class Child3 extends Person3{
   constructor( name:string){
	     super(name)
  	}
    run(){
        return this.userName3 //这里会提醒错误
    }
}
let c3=new Child3('王五')
//通过内部的函数访问父类私有的属性也会报错
console.log('private',c3.run()) */


//4.静态属性 static  关键字。可声明属性与方法，是静态的。只能被静态方法调用。静态方法只能直接被类调用,不能通过实例化调用。
//!!!注意 静态方法里面没法直接调用类里面的属性
/*  class person3 {
  name: string;
  // 静态属性，只能被静态方法调用
  static name1: string = "李四";
  constructor(name: string) {
    this.name = name;
  }
  //实例方法-不能调用静态方法
  run(): string {
    return `${this.name}在跑步`;
  }

  // 静态方法——里面没法直接调用类里面的属性
  static print() {
    return `我叫${this.name1}`;
  }
}

let p3 = new person3("张三");
console.log('实例方法调用', p3.run());
//静态方法不能通过实例化来调用
console.log('静态方法调用',person3.print());  */


//4.3 类与接口，类可以实现(implements)接口
//1.实现单个接口
/* interface Ip1{
    name:string;
    age:number;
}
class Person1 implements Ip1{
    name:string="张三";
    age:number=18;
    show():void{
       console.log(`姓名：${this.name},年龄：${this.age}`);
    }
}

let p1=new Person1()
p1.show() */

//2.实现多个接口
/* interface Ip1{
    name:string;
    age:number;
}
interface Ip2{
    change():void
}
class Person2 implements Ip1,Ip2{
    name:string="张三";
    age:number=18;
    show():void{
       console.log(`姓名：${this.name},年龄：${this.age}`);
    };
    //此处如果没有change方法就会报错
    change():void{
       console.log('接口2里内容');
    };
}

let p2=new Person2()
p2.show()  */

//5.抽象方法
/* //ts中的抽象类，它是提供其他类继承的基类，不能直接被实例化。用abstract关键字定义抽象类和抽象方法，抽象方法只能放在抽象类中
//抽象类-抽象类中必须包含至少一个抽象方法，不然没有意义。也就是说，抽象方法只能出现在抽象类中
abstract class Animal1 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  //抽象方法
  abstract eat(): any;
  // abstract eat2():string { return '' }; // 报错：方法“eat”不能具有实现，因为它标记为抽象 。也就是说抽象方法不能有具体体现，只能在派生类(即子类继承)中实现
}

// 抽象类无法直接实例化
// var a = new Animal();// 会报错

// 抽象类的子类必须实现抽象类里面的抽象方法
class Dog1 extends Animal1 {
  constructor(name: string) {
    super(name);
  }
  eat() {
    console.log(this.name + "快跑");
  }
}

var d = new Dog1("小狗");
d.eat(); // 小狗快跑  */

// 七：内置类型
/* //1.日期对象
const date: Date = new Date()
console.log('日期对象',date);

//2. DOM 和 BOM 标准对象
// document 对象，返回的是一个 HTMLElement
let body: HTMLElement = document.body
console.log('dom对象',body);
 */

//八.防止多个vue文件里有重名的
// export {}

</script>

