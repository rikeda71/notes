// 一定のプロパティ以外を自由に追加する方法
type UserWithUnknownProperty = {
  name: string;
  [k: string]: any; // index signature
  // 以下のように定義すると、nameでコンパイルエラーが出る
  // `number`とnameに付与されている`string`に互換性がないため
  // [k: string]: number;
  // 以下なら定義可能
  // nameはstringであるから
  // [k: string]: number | string;
};

const userB: UserWithUnknownProperty = {
  name: 'Taro',
  age: 26, // no error
};
const x = userB.name; // string
const y = userB.age; // any. index signatureについた型に推論される

// プロパティ型を制限する
type Answer = 'mighty' | 'lot' | 'few' | 'entirely';
type UserA = {
  name: string;
  // enqueteプロパティの中には、Answer型の値を持ったプロパティしか存在できない
  enquete: { [k: string]: Answer | undefined };
};
const user: UserA = {
  name: 'Taro',
  enquete: {
    exercise_habits: 'entirely',
    time_of_sleeping: 'few',
  },
};

// プロパティ名称を制限する
type Question = 'exercise_habits' | 'time_of_sleeping';
type UserB = {
  name: string;
  // `?`は必須 [k in type]とすることで、プロパティ名をtypeに含まれる名称のみに制限
  // undefinedは不要
  enquete: { [k in Question]?: Answer };
};
