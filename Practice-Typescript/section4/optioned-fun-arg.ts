// 引数に`?`をつけることで必ずしも引数を与えなくて良いようになる
function greet(name?: string) {
  return `Hello ${name}`;
}
console.log(greet());
console.log(greet('Taro'));

// 引数が持つメソッドを呼び出す場合には、引数が与えられないと困るのでエラーが出る
// そのため、ガード節を入れて対処する
// `?`はnullではなく、undefinedを許容する
function greetWithToUpper(name?: string) {
  if (name === undefined) return 'Hello';
  return `Hello ${name.toUpperCase()}`;
}
console.log(greetWithToUpper());

// default argument
function getFormattedValueWithDefaultValue(value: number, unit = 'pt') {
  return `${value.toFixed(1)} ${unit.toUpperCase()}`; // compile error
}
console.log(getFormattedValueWithDefaultValue(100));
console.log(getFormattedValueWithDefaultValue(100, 'kg'));
console.log(getFormattedValueWithDefaultValue(100, 0)); // error because unit: string

// type safe
type User = {
  age?: number;
  name?: string;
};
function registerUser(user: User) {}

// type safe of weak type
const maybeUser = {
  age: 26,
  name: 'Taro',
  gender: 'male',
};
// 型と一致するプロパティを1つも持たないオブジェクト
const notUser = {
  gender: 'male',
  graduate: 'Tokyo',
};
registerUser(maybeUser);
registerUser(notUser); // compile error
registerUser({}); // no error
registerUser(); // error

// Excess Property Checks（過剰なプロパティチェック）
// オブジェクトを直接引数に渡す場合はエラーが出る
registerUser({
  age: 26,
  name: 'Taro',
  gender: 'male',
});
// スプレッド演算子を使った場合、エラーが起こらない
registerUser({
  ...{
    age: 26,
    name: 'Taro',
    gender: 'male',
  },
});

// read only property
type State = {
  readonly id: number;
  name: string;
};

const state: State = {
  id: 1,
  name: 'Taro',
};
state.name = 'Hanako';
state.id = 2; // compile error

const state2: Readonly<State> = {
  id: 1,
  name: 'Taro',
};

state2.name = 'Hanako'; // compile error

// Object.freezeの型推論
const frozenState = Object.freeze(state);
frozenState.name = 'Hanako'; // compile error
