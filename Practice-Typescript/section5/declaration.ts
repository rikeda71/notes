// declaration space
// 同じ名前だが、宣言方法、種別が違うため、競合しない（コンパイルエラーにならない）
// グループには Value, Type, Namespace の3つが存在する
const Test = {}; // Value
interface Test {} // Type
namespace Test {} // Namespace

// Value declaration space
// const, let, functionなどはValueに割り当てられる
const value1 = 'test';
let value2 = 'test';
function greet() {} // error
const greet = 'hello'; // error

// Type declaration space
// interface, type aliasが該当する
// interfaceは「open ended」に準拠しているため、オーバーロードが可能
interface User {
  name: string;
}
// overload
interface User {
  age: number;
}
/* 以下の解釈になる
interface User {
  name: string;
  age: number;
}
*/

// typeの場合はエラーになる
type TUser = {
  name: string;
};
type TUser = {
  age: number;
};

// Namespace declaration space
// Namespace内で型を新たに作り出し、参照することができる
interface Test {
  value: string;
}

namespace Test {
  export interface Properties {
    name: string;
  }
}

const test: Test = {
  value: 'value',
};

const properties: Test.Properties = {
  name: 'Taro',
};
