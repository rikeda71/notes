// import構文で変数や関数を読み込んだ場合のみ型推論が行われる
// require構文で型推論は行われない
import { value, label, returnFalse } from './test';
const v1 = value;
const v2 = label;
const v3 = returnFalse;
/*
const v1: 10
const v2: 'label'
const v3: () => boolean
*/
