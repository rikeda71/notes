// Generics Examples
interface Box<T> {
  value: T;
}

const box0: Box = { value: 'test' }; // error genericsを指定していない
const box1: Box<string> = { value: 'test' };
const box2: Box<number> = { value: 'test' }; // error 型が違う

// initial Generics
// Genericsの型のデフォルト値を指定することができる
interface IBox<T = string> {
  value: T;
}

const ibox0: IBox = { value: 'test' }; // no error
const ibox1: IBox<string> = { value: 'test' };
const ibox2: IBox<number> = { value: 'test' }; // error 型が違う
