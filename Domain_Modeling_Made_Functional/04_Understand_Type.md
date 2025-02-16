# 第4章 型の理解

- F# について
- 型の合成について

## 4.3 型の合成

代数的データ型について紹介

### 直和型

- 直和型 : 和(OR) を表現するデータ型

```ts
type AppleVariety =
    | GoldenDelicious
    | GrannySmith
    | Fuji
type BananaVariety =
    | Cavendish
    | GrosMichel
    | Manzano
type CherryVariety =
    | Montmorency
    | Bing

type FruitSnack =
    | AppleVariety
    | BananaVariety
    | CherriesVariety
```

- Go や Python では標準の言語仕様では対応してない。
- 関数型プログラミング言語やモダンな言語仕様を持つ Swift, Kotlin, Rustなど、TypeScript で対応している
- Java なら Java17 から Standard になった Sealed Classes で表現できる

```java
sealed interface FruitSnack permits AppleVariety, BananaVariety, CherryVariety {}

// Apple
sealed interface AppleVariety extends FruitSnack permits GoldenDelicious, GrannySmith, Fuji {}
record GoldenDelicious() implements AppleVariety {}
record GrannySmith() implements AppleVariety {}
record Fuji() implements AppleVariety {}

// Banana
sealed interface BananaVariety extends FruitSnack permits Cavendish, GrosMichel, Manzano {}
record Cavendish() implements BananaVariety {}
record GrosMichel() implements BananaVariety {}
record Manzano() implements BananaVariety {}

// Cherry
sealed interface CherryVariety extends FruitSnack permits Montmorency, Bing {}
record Montmorency() implements CherryVariety {}
record Bing() implements CherryVariety {}
```

### 直積型

- 直積型 : 積(AND) を表現するデータ型
- シンプルに複数の型のフィールドを持つデータ型

```ts
type FruitSalad = {
    Apple: AppleVariety
    Banana: BananaVariety
    Cherries: CherryVariety[]
}
```

### 単純型

- 選択肢が1つしかない直和型のこと

```ts
type ProductCode = string
```

java だと以下のような感じか

```java
record ProductCode(
    String value
) {
}
```

### 代数的な型システム

- 代数的な型システム: 全ての複合型が、より小さな型を AND または OR で合成してできているもの
- String や int でフィールドを定義せず、全て型にする
    - 単一の型を取りえる値は単純型を使って型を定義

## 4.6 省略可能な値、エラー、およびコレクションのモデリング

### 4.6.2 省略可能な値のモデリング

- 省略可能な値は Option という直和型でモデル化できる
    - 省略可能な値は 存在 または 不在(null で表現) を取りえる
- Java や Swift だと Optional で表現可能
- TypeScript や Kotlin だと型名の後に `?` をつければ表現できる

```java
// ProductCode または null を取りえる
Optional<ProductCode> productCode;
```

```ts
ProductCode? productCode;
```

### 4.6.1 エラーのモデリング

- エラーを取りえる値は Result という直和型でモデル化できる
    - 成功 または エラー を取りえる
- Rust, Kotlin, Swift などでは `Result` 型で表現できる
- 関数型言語では `Either` 型が対応している

```rs
// このような定義
enum Result<T, E> {
    Ok(T),
    Err(E),
}

// https://doc.rust-jp.rs/book-ja/ch09-02-recoverable-errors-with-result.html
use std::fs::File;

fn main() {
    // File::open(...) は Result<std::fs::File, std::io::Error> を取りえる
    let f = File::open("hello.txt");

    let f = match f {
        // 成功しているケース
        Ok(file) => file,
        // エラーが出たケース
        Err(error) => {
            // ファイルを開く際に問題がありました
            panic!("There was a problem opening the file: {:?}", error)
        },
    };
}
```

- Go の `*Object, error` を返すのも厳密には違うが、近しい使い勝手か

```go
v := "10"
s, err := strconv.Atoi(v)
// err != nil であろうと、s には値が入っている可能性はある
if err != nil {
	fmt.Printf("%T, %v", s, s)
}

```
