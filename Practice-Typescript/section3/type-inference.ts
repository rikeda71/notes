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
