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

// extendsによる制約
// 以下の場合、stringかnumberのどちらかでないとダメ
interface EBox<T extends string | number> {
  value: T;
}
const ebox0: EBox<string> = { value: 'test' };
const ebox1: EBox<number> = { value: 0 };
const ebox2: EBox<boolean> = { value: false }; // error
