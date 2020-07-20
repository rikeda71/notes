const defaultTheme = {
  backgroundColor: 'orange',
  borderColor: 'red',
};
/*
プロパティは再代入可能であるため、'orange'型ではなく、string型になる
const defaultTheme = {
  backgroundColor: string,
  borderColor: string,
};
*/

// down cast
// down castとは、より詳細な型を付与すること(ex. string -> String Literal types)
// assertionによって「型宣言を行うことで、上記の問題を解決」
const defaultThemeWithAssertion = {
  backgroundColor: 'orange' as 'orange',
  borderColor: 'red' as 'red',
};
defaultTheme.backgroundColor = 'blue'; // ok
defaultThemeWithAssertion.backgroundColor = 'blue'; // error
/*
以下はエラーになる。互換性がある型でないとだめ（ダウンキャストできないとダメ）
const defaultThemeWithAssertion = {
  backgroundColor: 'orange' as false, // error
  borderColor: 'red' as 0, // error
};
*/

// up cast
// より抽象的な型をつけること
// 本来はstring型が返ってくることは自明だが、anyが返ってくると宣言
function toNumber(value: string): any {
  return value;
}

const fiction: number = toNumber('1.000'); // no error
fiction.toFixed(); // Runtime Error
