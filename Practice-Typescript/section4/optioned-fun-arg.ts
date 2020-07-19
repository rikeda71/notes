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
