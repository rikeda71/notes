// 従来のUtility Types
// TypeScript2.8以前までの形式

/// 処理対象の型
interface User {
  name: string;
  age: number | null;
  gender: 'male' | 'female' | 'other';
  birthplace?: string;
}

/// Readonly型
/// object型のプロパティを全て`readonly`に変換して、新しい型を生成する型
type ReadonlyWrapUser = Readonly<User>;
/*
type ReadonlyWrapUser = {
  readonly name: string
  readonly age: number | null;
  readonly gender: 'male' | 'female' | 'other';
  readonly birthplace?: string;
}
*/

/// Partial型
/// Object型のプロパティを全て`optional`に変換し、新しい型を生成する型
type PartialWrapUser = Partial<User>;
/*
type PartialWrapUser = {
  name?: string;
  age?: number | null;
  gender?: 'male' | 'female' | 'other';
  birthplace?: string;
}
*/

/// Required型
/// Object型のプロパティから`optional`を排除し、新しい型を生成する型
type RequiredWrapUser = Required<User>;
/*
type RequiredWrapUser = {
    name: string;
    age: number | null;
    gender: 'male' | 'female' | 'other';
    birthplace: string;
}
*/
/// Record型
/// 単一Genericsに指定したプロパティ名称で、新しいObject型を生成する型
type UserRecord = Record<'user', User>;
/*
type UserRecord = {
    user: User;
}
*/
/// Pick型
/// 第二Genericsに指定した名称のプロパティ型を、第一Genericsに指定した型から抽出し、新しいObject型を生成する型
type UserGender = Pick<User, 'gender'>;
/*
type UserGender = {
    gender: 'male' | 'female' | 'other';
}
*/

/// Omit型
/// 第二Genericsに指定した名称のプロパティ型を、第一Genericsから取り除き、新しいObject型を生成する型
/// typescript >= 3.4
type WithoutBirthplace = Omit<User, 'birthplace'>;
/*
type WithoutBirthplace = {
    name: string;
    age: number | null;
    gender: 'male' | 'female' | 'other';
}
*/
