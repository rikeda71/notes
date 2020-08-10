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

// 新しい組み込みObject Types
// typescript2.8以降で実装

/// Exclude型
/// Exclude<T,U>はT型からU型と互換性のある型を取り除いた型を生成
type EX = Exclude<'a' | 'b', 'b'>; // "a"
type EY = Exclude<'a' | (() => void), Function>; // "a"

/// Extract型
/// Extract<T,U>は、T型からU型と互換性のある型を残し、新しい型を生成
type EX2 = Extract<'a' | 'b', 'b'>; // 'b'
type EY2 = Extract<'a' | (() => void), Function>; // () => void

/// NonNullable型
/// NonNullable<T>はT型からnull、undefinedを除いた、新しい型を生成
type NX = NonNullable<string | null | undefined>; // string

/// ReturnType型
/// 関数型の返却値を持つ型を生成
type RX = ReturnType<() => string>;
type RY = ReturnType<string>; // error

/// InstanceType型
/// InstanceType<T> はコンストラクタ関数がたのインスタンス型を取得できる
class C {
  x = 0;
  y = 0;
}
type IX = InstanceType<typeof C>;
const n = {} as IX; // { x: number; y: number; }

// 公式提唱Utility Types
// 公式ドキュメントで提唱されているものの、標準で組み込まれてはいない型定義

/// TypeName型
/// TypeName<T>はGenericsに互換性のある方が適応された場合
/// それに対応するString Literal Typesを返却する型
type TypeName<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : T extends Function
  ? 'function'
  : 'object';

type T0 = TypeName<string>; // "string"
type T1 = TypeName<'a'>; // "string"
type T2 = TypeName<true>; // "boolean"
type T3 = TypeName<() => void>; // "function"
type T4 = TypeName<string[]>; // "object"

/// FunctionProperties型
/// Mapped Typesを併用し、Object型から関数型のみのプロパティ名を抽出し、
/// その名称を元に関数型のみの新しい型を作る型
interface Part {
  id: number;
  name: string;
  subparts: Part[];
  updatePart(newName: string): void;
}

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
type X = FunctionPropertyNames<Part>; // "updatePart"
type Y = FunctionProperties<Part>;
/*
type Y = {
    updatePart: (newName: string) => void;
}
*/

/// NonFunctionProperties型
/// Mapped Typesを併用し、Object型から関数型以外のプロパティ名を抽出し、
/// その名称を元に関数型を除いた新しい型を作る型
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
type NonX = NonFunctionPropertyNames<Part>; // type NonX = "id" | "name" | "subparts"
type NonY = NonFunctionProperties<Part>;
/*
type NonY = {
    id: number;
    name: string;
    subparts: Part[];
}
*/

/// Unpacked型
/// 配列要素型、関数戻り型、Promise.resolve引数型を取得する型
type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

type UT0 = Unpacked<string>; // string
type UT1 = Unpacked<string[]>; // string
type UT2 = Unpacked<() => string>; // string
type UT3 = Unpacked<Promise<string>>; // string
type UT4 = Unpacked<Promise<string>[]>; // Promise<string>
type UT5 = Unpacked<Unpacked<Promise<string>[]>>; // string

// 再起的なUtility Types
// Mapped TypesとConditional Typesを併用することで、再起的な型変換が可能
interface RUser {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  birth: {
    day: Date;
    place?: {
      country?: string | null;
      state?: string;
    };
  };
}

/// isPrimitive型
/// Object型およびArray型に該当するか否かを判定する型（該当しなければPrimitive型とみなす）
type Unbox<T> = T extends { [k: string]: infer U }
  ? U
  : T extends (infer U)[]
  ? U
  : T;
type isPrimitive<T> = T extends Unbox<T> ? T : never;

/// DeepReadonly型
/// 再帰的にReadonly変換する型
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends isPrimitive<T[P]>
    ? T[P]
    : DeepReadonly<T[P]>;
};
type DeepReadonlyWrapUser = DeepReadonly<RUser>;
/*
interface DeepReadonlyWrapUser {
  readonly name: string;
  readonly age: number;
  readonly gender: 'male' | 'female' | 'other';
  readonly birth: {
    day: Date;
    place?: {
      country?: string | null;
      state?: string;
    };
  };
}
*/

/// DeepRequired型
/// 再帰的にRequired変換する型
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends isPrimitive<T[P]> ? T[P] : DeepRequired<T[P]>;
};
type DeepRequiredWrapUser = DeepRequired<RUser>;
/*
type DeepRequiredWrapUser = {
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    birth: DeepRequired<{
        day: Date;
        place?: {
            country?: string | null;
            state?: string;
        };
    }>;
}
*/

/// などなど。。。

// 独自定義Utility Types
// TypeScript2.8で導入されたConditional Typesや3.0で導入されたTuple Spreadにより、
// 既存型から様々な型を抽出したり加工したりすることが可能

/// Unbox
/// オブジェクトの子ノードをUnion Typesで取得する型
type unbox<T> = T extends { [K in keyof T]: infer U } ? U : never; // 本当はUnbox。重複しているから小文字にしている
type T = Unbox<{ a: 'A'; b: 'B'; c: 'C' }>; // type T = 'A' | 'B' | 'C'

/// UnionToIntersection
/// Union TypesをIntersection Typesに変換する型
type UTI<T> = T extends any ? (args: T) => void : never;
type UnionToIntersection<T> = UTI<T> extends (args: infer I) => void
  ? I
  : never;
type A_or_B = { a: 'a' } | { b: 'b' };
type A_and_B = UnionToIntersection<A_or_B>;
/*
type A_and_B = {
    a: 'a';
} & {
    b: 'b';
}
*/

/// NonEmptyList型
/// Genericsに指定した型に該当する要素を、最低でも1つ含む必要がある型
type NonEmptyList<T> = [T, ...T[]];
const list1: NonEmptyList<string> = []; // compile error
const list2: NonEmptyList<string> = ['test'];

/// PickSet型
/// Setの値型を取得する型
type PickSet<T> = T extends Set<infer I> ? I : never;
const set = new Set([1, 2] as const); // const set: Set<1 | 2>
type SetValues = PickSet<typeof set>; // type SetValues = 1 | 2

/// PickMapKeys型
/// Mapのキーを取得する型
const map = new Map([
  [0, 'foo'],
  [1, 'bar'],
] as const);
type PickMapKeys<T> = T extends Map<infer K, any> ? K : never;
type MapKeys = PickMapKeys<typeof map>; // type MapKeys = 0 | 1
