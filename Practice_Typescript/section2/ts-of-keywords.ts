// typeof
// 宣言済みの変数の型を取得できる。型クエリーとも呼ばれる
// JSのtypeofとは別物(JSのtypeofは変数の型を取得できる)
let asString: string = '';
let v: typeof asString;
v = 'value';
v = 0; // error
// typeofの有効活用は型推論と組み合わせた時に可能
// ある変数と同じ型の変数を用意できる
let myObject = { foo: 'foo' };
let anotherObject: typeof myObject = { foo: '' };
anotherObject['foo'] = 'value';
anotherObject['bar'] = 'value'; // error

// keyof
// オブジェクトのプロパティ名称をString Literal Union Typesで取得
type SomeType = {
  foo: string;
  bar: string;
  baz: string;
};
// "foo" | "bar" | "baz" 型となる
let someKey: keyof SomeType;
// typeofとkeyofの併用
const myObject2 = {
  foo: 'FOO',
  bar: 'BAR',
  baz: 'BAZ',
};
// typeof myObject2 = {foo: string, bar: string, baz: string}
// keyof typeof myObject2 = "foo" | "bar" | "baz"
let myObject2Key: keyof typeof myObject2;
myObject2Key = 'bar';
myObject2Key = 'qux'; // error
// property nameが数値の場合はNumeric Literal Union Typesが取得される
const indexedObject = {
  0: 0,
  1: 1,
};
// typeof indexedObject = {0: number, 1: number}
// keyof typeof indexedObject = 0 | 1
let indexedObjectKey: keyof typeof indexedObject;
indexedObjectKey = 1;
indexedObjectKey = 2; // error
