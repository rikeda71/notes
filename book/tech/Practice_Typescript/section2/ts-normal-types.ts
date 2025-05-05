// boolean
let flag: boolean = false;

// number
let decimal: number = 256;
let hex: number = 0xfff; // 16
let binary: number = 0b0000; // 2
let octal: number = 0o123; // 8

// string
let color: string = 'white';
color = 'black';
let myColor: string = `my color is ${color}`;

// array
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// tuple
let x: [string, number];
x = ['hello', 10];
x = [10, 'hello']; // error

// predict type for tupe
console.log(x[0].substr(1));
console.log(x[1].substr(1));

// any
let whatever: any = 0;
whatever = 'something';
whatever = false;

// unknown  TypeScript3.0で追加。型安全なany
const certainlyNumbers: number[] = ['0']; // error
const maybeNumbers: any[] = ['0'];
const probablyNumbers: unknown[] = ['0']; // OK
certainlyNumbers[0].toFixed(1); // OK
maybeNumbers[0].toFixed(1); // OK (caused Runtime Error)
probablyNumbers[0].toFixed(1); // error（値の代入はOKだが、値の利用に関しては型準拠）

// void
function logger(message: string): void {
  console.log(message);
}
let unusable: void = undefined; // void型には undefined しか代入できない

// null / undefined
// 基本的には2つとも全ての型に代入可能だが、`--strictNullChecks`フラグを`true`にすると、voidとnull, undefined にしかこれらの型の値は代入できない
let u: undefined = undefined;
let n: null = null;

// never  発生し得ない値の型を表す 戻り値を得られない関数はこの型であると言える
function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}

// object  boolean, number, string, symbol, null, undefined のいずれかでもない。`object` と型をつけることで事前にエラーを出してくれる
let objectBrace: {};
let objectType: object;

objectBrace = true;
objectBrace = 0;
objectType = false; // error
objectType = 1; // error
