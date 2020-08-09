// Conditional Types
// 型の互換性を条件分岐にかけて、型推論を導出する型
type IsString<T> = T extends string ? true : false;
type X = IsString<'test'>; // type X = true
type X = IsString<0>; // type X = true

/// Mapped Typesでの利用
/// 次のように、Mapped Typesの中でConditional Typesを利用できる
interface Properties {
  name: string;
  age: number;
  flag: boolean;
}

type IsType<T, U> {
  [K in keyof T]: T[K] extends U ? true : false
}

/// 型で型を変換する
type tIsString = IsType<Properties, string>
type tIsNumber = IsType<Properties, number>
type tIsBoolean = IsType<Properties, boolean>
/*
type tIsString = {
  name: true;
  age: false;
  flag: false;
}
*/

// 条件に適合した型を抽出する型
// 該当するプロパティ名称のみをUnion Typesで取得する方法
interface CProperties {
  name: string;
  age: number;
  walk: () => void
  jump: () => Promise<void>
}

type Filter<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T]

type StringKeys = Filter<CProperties, string>; // type StringKeys = "name"
type NumberKeys = Filter<CProperties, number>; // type NumberKeys = "age"
type FunctionKeys = Filter<CProperties, Function>; // type FunctionKeys = "walk" | "jump"
type ReturnPromiseKeys = Filter<CProperties, () => Promise<any>> // type ReturnPromiseKeys = "jump"

/// 一致するプロパティ名称から型を生成
type TStringKeys<T> = Filter<T, string>;
type TNumberKeys<T> = Filter<T, number>;
type TFunctionKeys<T> = Filter<T, Function>;
type TReturnPromiseKeys<T> = Filter<T, () => Promise<any>>

type Strings = Pick<CProperties, TStringKeys<CProperties>>;
type Functions = Pick<CProperties, TFunctionKeys<CProperties>>;
/*
type Strings = {
  name: string
}
type Functions = {
  walk: () => void
  jump: () => Promise<void>
}
*/

/// 条件分岐で得られる確約
/// 型の条件分岐が成立した場合、Indexed Access Typesによる型参照が可能になる
interface DeepNest {
  deep: {nest: {value: string}}
}
interface ShallowNest {
  shallow: {value: string}
}
interface DSProperties {
  deep: DeepNest;
  shallow: ShallowNest;
}
/// Salvage は <T extends DeepNest> によって、DeepNest型を前提とすることがわかっているから
/// T['deep'][...]という風な指定のしかたが可能になっている
type Salvage<T extends DeepNest> = T['deep']['nest']['value'];
type DeepDive<T> = {
  [K in keyof T]: T[K] extends DeepNest ? Salvage<T[K]> : never
}[keyof T]
type DSX = DeepDive<DSProperties> // type DSX  = string

// 部分的な型抽出
// `infer`シグネイチャを使うと部分的な型抽出が可能に。
// Type Inference in Conditional Typesと呼ばれる機能
// `infer`はConditional Types構文の中でのみ利用できるシグネイチャ
function greet() {
  return 'Hello!'
}
type Return<T> = T extends (...arg: any[]) => infer U ? U : never
type R = Return<typeof greet> // type R = string
/// 引数型の抽出
/// 第一引数に先に該当した場合、第一引数の型を返却、第二引数に該当した場合、第二引数の型を返却する
function ggreet(name: string, age: number) {
  return `Hello! I'm ${name}. ${age} years old.`
}
type A1<T> = T extends (...arg: [infer U, ...any[]]) => any ? U : never
type A2<T> = T extends (...arg: [any, infer U, ...any[]]) => any ? U : never
type AA<T> = T extends (...arg: infer U) => any ? U : never
type gX = A1<typeof ggreet> // type X = string
type gY = A2<typeof ggreet> // type X = number
type gZ = AA<typeof ggreet> // type X = [string, number]
/// Promise.resolve引数型の抽出
async function agreet() {
  return 'Hello!'
}

type ResolveArg<T> = T extends () => Promise<infer U> ? U : never
type aX = typeof agreet // type aX = () => Promise<string>
type aY = ResolveArg<typeof agreet> // type aY = string;