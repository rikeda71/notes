// Intersection Types 複数の型を1つに結合する

type Dog = {
  tail: Tail;
  bark: () => void;
};

type Bird = {
  wing: Wing;
  fly: () => void;
};

type Kimera = Dog & Bird;

/*
 以下のように推論される
type Kimera = {
  tail: Tail;
  wing: Wing;
  bark: () => void;
  fly: () => void;
}
*/

// ただし、プリミティブ型はIntersection Types として実現できるが never 型になる。
// string でありながら number でもある要素は存在しないため
function returnNever(): never {
  throw new Error();
}
let unexistenceType: string & number & boolean = returnNever();
let problematicNumber: string & number = '0'; // error

// Union Types
// 複数の型のうち、1つの型が成立することを示している
let value: boolean | number | string;
value = false;
value = 1;
value = '2';
// array型にUnion Type を使う場合
let numberOfStrings: (number | string)[];
numberOfStrings = [0, '1'];
numberOfStrings = [0, '1', false]; // error
// Union Typesを使うことで、Nullable型を表現可能
let nullableString: string | null;
nullableString = null;
nullableString = 'notNull';

let nullableStrings: (string | null)[] = [];
nullableStrings.push('1');
nullableStrings.push(null);
nullableStrings.push(false); // error

// Literal Types
// String Literal Types
// myNameの場合、'Taro'か'Jiro' 以外の値を受け付けない
let myName: 'Taro' | 'Jiro';
myName = 'Taro'; // OK
myName = 'Jiro'; // OK
myName.toLocaleLowerCase(); // OK
myName = 'Hanako'; // error

// Numeric Literal Types
// 0以外を代入することはできない。number型の持つメソッドは呼び出せる
let zero: 0;
zero = 0;
zero = 1; // error
zero.toFixed(1); // OK
// Numeric Literal Types の応用
let bit: 8 | 16 | 32 | 64;
bit = 8;
bit = 12; // error

// Boolean Literal Types
let truth: true;
truth = true;
truth = false; // error
