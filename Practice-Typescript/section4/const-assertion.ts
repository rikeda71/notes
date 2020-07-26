// const assertion
// typescript3.4から登場
// 以下2つは等価
const tuple1 = [false, 1, '2'] as [false, 1, '2'];
const tuple2 = [false, 1, '2'] as const;
// Winding Literal Typesを抑止する
// const assertionを使うことで、Widing Literal Typesを抑止できる
const a = 'a'; // 'a'
let b = a; // string
const A = 'A' as const; // 'A'
let B = A; // 'A'
// 関数についても同じ
function increment() {
  return { type: 'INCREMENT' };
}
function decrement() {
  return { type: 'DECREMENT' } as const;
}
const x = increment(); // {type: string}
const y = decrement(); // {readonly type: 'DECREMENT'}
// 定数に対するconst assertion
export const constValues = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  SET_COUNT: 'SET_COUNT',
} as const;

const constants = constValues;
/*
const constants: {
  readonly INCREMENT: 'INCREMENT';
  readonly DECREMENT: 'DECREMENT';
  readonly SET_COUNT: 'SET_COUNT';
}
*/
