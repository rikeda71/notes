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
