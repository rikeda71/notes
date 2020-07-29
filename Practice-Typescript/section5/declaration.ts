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

// interfaceの結合
interface Bounds {
  width: number;
  height: number;
  move(amount: string): string;
}

interface Bounds {
  left: number;
  top: number;
  // height: string // error
  move(amount: number): string;
}
/* 以下の解釈になる
interface Bounds {
  width: number;
  height: number;
  left: number;
  top: number;
  // 関数メンバーはオーバーロード
  move(amount: string | number): string
}
*/

// namespaceの結合
// namespaceも同じ名前同士だと自動的に結合される
// さらに結合先の定義も参照できる（ただし、exportされている必要がある）
// 例えば、Expressなどで採用されている
namespace Publisher {
  export const name = '';
  interface Appearance {
    color: 'monochrome' | '4colors' | 'fullcolors';
  }
  export interface Book {
    title: string;
    appearance: Appearance;
  }
}
namespace Publisher {
  export interface CookingBook extends Book {
    category: 'cooking';
    // exportされていないためエラー
    appearance: Appearance; // error
  }
}
// 既存の定義へのプロパティの追加
namespace Publisher {
  export interface Book {
    lang: 'ja';
  }
  export interface TravelBook extends Book {
    category: 'travel';
  }
}
// 型の確認
const cookingBook: Publisher.CookingBook = {} as Publisher.CookingBook;
/*
const cookingBook: {
  title: string
  appearance: Appearance
  lang: 'ja' // 後の型宣言により追加される
  category: 'cooking'
}
*/
const travelBook: Publisher.TravelBook = {} as Publisher.TravelBook;
/*
const travelBook: {
  title: string
  appearance: Appearance
  lang: 'ja'
  category: 'travel'
}
*/

// モジュール型結合
// あたかもオリジナルと同じファイルで宣言されたかのように型が結合される
// ライブラリが提供している型を拡張するために使われる
// モジュール型結合を利用する、namespaceの宣言拡張を利用するの判断は
// DefinitelyTyped(@types/...)で提供されている型・ライブラリにビルトインされている型宣言を確認し、
// 適切な方法が選ばれる
// 代表的なところでは、Vuejsでプラグイン拡張のためにモジュール型結合が利用されている
