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

// 関数のGenerics

function boxed<T>(props: T) {
  return { value: props };
}
// 関数のGenericsは暗黙的に解決（推論）される
const fbox0 = boxed('test');
const fbox1 = boxed(0);
const fbox2 = boxed(false);
const fbox3 = boxed(null);

/// アサーションによる明示的な型の付与
/// Nullable型などを直接適応したい場合に使う
const fbox4 = boxed(false as booelan | null);
const fbox5 = boxed<string | null>(null);
/// 関数の代入は以下のようにもできる
const boxed2 = <T>(props: T) => ({ value: props });

/// extendsによる制約
function eboxed<T extends string>(props: T) {
  return { value: props };
}
const efbox1 = eboxed(0); // error
const efbox2 = eboxed('test');
