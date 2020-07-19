// letの型推論
let user = 'Taro';
let value = 0;
let flag = false;
/*
let user: string
let value: number
let flag: boolean
*/

// constの型推論
// constは再代入不可のため、適用される型推論はLiteral Types
const cuser = 'Taro';
let cvalue = 0;
let cflag = false;
/*
let cuser: 'Taro'
let cvalue: 0
let cflag: false
*/

// Widening Literal Types
// constに適応されるLiteral Typesは通常のLiteral Typesとは異なる
// letやvarにconstを代入するとLiteral Typesでなくなってしまう
// 以下はstringであっても同様（明示的に型を指定していない場合、letやvarに代入するとLiteralではなくstring型になる）
const wideningZero = 0;
const nonWideningZero: 0 = 0;
const asNonWideningZero = 0 as 0;

let zeroA = 0; // let zeroA: number
let zeroB = wideningZero; // let zeroB: number
let zeroC = nonWideningZero; // let zeroC: 0
let zeroD = asNonWideningZero; // let zeroD: 0
const zeros = {
  zeroA, // number
  zeroB, // number
  zeroC, // 0
  zeroD, // 0
};

// Arrayの型推論
const a1 = [true, false];
const a2 = [0, 1, '2'];
const a3 = [false, 1, '2'];

/*
const a1 : boolean[]
const a2 : (string | number)[]
const a3 : (string | number | boolean)[]
*/

// assersion to array
const a4 = [0 as 0, 1 as 1];
a4.push(1);
a4.push(2); // error

const zero: 0 = 0;
const one: 1 = 1;
const a5 = [zero, one]; // const a1: (0 | 1)[]
a5.push(1);
a5.push(2); // error

// Tupleの型推論
// 記法だけではArrayと差別化できないため、as [type, ...]を後ろにつける
const t1 = [false] as [boolean];
const t2 = [false, 1] as [boolean, number];
const t3 = [false, 1, '2'] as [boolean, number, string];
const v3_0 = t3[0];
const v3_1 = t3[1];
const v3_2 = t3[2];
const v3_3 = t3[3]; // error

// 要素の追加の場合、Tupleに含まれている型のUnion Typesになる
// booleanのみ追加できる
t1.push(false);
t1.push(true);
t1.push(1); // error
// boolean | numberを追加できる
t2.push(false);
t2.push(1);
t2.push('2'); // error

// Array型推論
let list = ['this', 'is', 'a', 'test'];
list.push('!');
console.log(list);

list = list.map((item) => item.toUpperCase()); // item string
console.log(list);

let message = list.reduce((prev, current) => `${prev} ${current}`);
console.log(message);

// objectの型推論
const obj = {
  foo: false,
  bar: 1,
  baz: '2',
};
/*
const obj = {
  foo: boolean,
  bar: number,
  baz: string
}
*/

obj['foo'] = true;
obj['foo'] = 0; // error

// with assertion
const objWithAssertion = {
  foo: false as false,
  bar: 1 as 1,
  baz: '2' as '2',
};
objWithAssertion['foo'] = true; // error
