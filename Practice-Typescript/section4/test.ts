// 絞り込み型推論の例
function getFormattedValue(value: number | null) {
  // null型の変数は`toFixed` methodは呼び出せない
  if (value === null) return '-- pt';
  return `${value.toFixed(1)} pt`; // compile error
}
console.log(getFormattedValue(0.1));
console.log(getFormattedValue(0));
console.log(getFormattedValue(null)); // -- pt
