// Literal Typesの互換性
// string -> String Literal Types => error
// String Literal Types => string: ok
let s1: 'test' = 'test';
let s2: string = s1; // no error
let s3: string = 'test';
let s4: 'test' = s3; // error
// numberも同様
let n1: 0 = 0;
let n2: number = n1; // no error
let n3: number = 0;
let n4: 0 = n3; // error

// anyの互換性
// anyはどんな型にも宣言、代入ができる
let a1: any = false; // let a1: any
let a2: string = a1; // let a2: string
let a3 = a1 as number; // let a3: number

// unknown型の互換性
// unknown = どんな型の値も受け入れることができるTopType
// anyとは違い、型が決定するまで、別の型に代入できない
let un1: unknown = 'test';
let un2: string = un1; // compile error
let un3: number = un1 as number; // 誤った型宣言
// 互換性のないアサーション
const s3 = 0 as string; // compile error

// {}型の互換性
// {}型はオブジェクト型のためだけに存在しているわけでない。
// numberやstringに互換性があるため、全部コンパイルが通る
// all ok
let o1: {} = 0;
let o2: {} = '1';
let o3: {} = false;
let o4: {} = {};
// NG
let oo1: object = 0;
let oo2: object = '1';

// プリミティブ型（number, stringなど）は {}型のサブタイプ
type K0 = keyof {}; // never
type K1 = keyof { K: 'K' }; // "K"
type K2 = keyof 0; // "toString" | "toFixed" ...
type K3 = keyof '1'; // number | "toString" ...
type K4 = keyof false; // "valueOf"

// {}型の代入
// 同じプロパティが別の型の場合は代入できない
let O1 = { p1: 0 };
let O2 = { p1: 'test' };
O1 = O2; // error
O2 = O1; // error
// 同じプロパティが存在しない場合にも代入できない
let O3 = { p2: 'test' };
O2 = O3;
// 以下の場合は、同じプロパティが存在し、プロパティの持つ型も同じであるため、代入可能
let O4 = { p1: 'test', p2: 0 };
O2 = O4;
// 逆はダメ
O4 = O2; // error
// プロパティを持たない場合でも同様
let O5 = {};
O5 = O4;
O4 = O5; // error
