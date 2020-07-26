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
