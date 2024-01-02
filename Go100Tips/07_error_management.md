# エラー管理

Go におけるエラー管理は他のプログラミング言語でよくある try/catch 機構には依存していない。

エラーに関連するよくある間違いを説明する。

## No.48:パニックを発生させる p.157

Go では `error` 型でエラーが管理される。

他言語に慣れた人だと、`panic` や `recover` を使って例外処理を再現したくなってしまう。

どのような時にパニックを使うべきか記す。

### Go におけるパニック

パニックは __通常の制御の流れを止める__ 組み込み機能

パニックが発生すると現在の goroutine がリターンするか、recover でパニックが捕捉されるまで panic はコールスタックを遡る

例えば以下のようなコードを実行したら

```go
func main() {
    defer func() {
      if r := recover(); r != nil {
        fmt.Println("recover", r)
      }
    }

    f()
}

func f() {
  fmt.Println("a")
  panic("foo")
  fmt.Println("b")
}
```

出力結果は以下になる。

```
a
recover foo
```

panic したものの、`recover` で panic が捕捉されるため、異常終了しない。

### Go における最適なパニックの利用方法

- panic は __プログラマーエラー__ など、純粋に例外的な状態を知らせるために使う
    - ※ 純粋に例外的な状態 = 「外部通信で失敗した」などの例外ではなく、プログラムとして想定していない状態のことを指すと思われる
- 依存関係を必要とするのにも関わらず、その初期化に失敗する場合

#### 例 HttpStatusCode を検査するコードでの例

仕様上、取り得ることがないのでプログラマーエラー

```go
func checkWriteHeaderCode(code int) {
    if code < 100 || code > 999 {
        panic(fmt.Sprintf("invalid WriteHeader code %v", code))
    }
}
```

#### 例 データベースドライバーの登録

- driver が存在しない または 重複する場合は後続の処理に支障をきたすのでプログラマーエラー

```go
// database/sql パッケージより
// driver.Driver は interface
var drivers map[string][driver.Driver]

func Register(name string, driver driver.Driver) {
    if driver == nil {
        panic("sql: Register driver is nil")
    }

    if _, dup := drivers[name]; dup {
        panic("sql: Register called twice for driver " + name)
    }
    drivers[name] = driver
}
```

#### 例 アプリケーションの依存関係の初期化に失敗する場合

- 依存関係の初期化に失敗する場合、後続の処理を実行できないのでパニックを発生させる
- 以下の例だと、外部通信はアプリケーションで必要だが、初期化に失敗したので、アプリケーションの起動ができないということでパニックとする

```go
func main() {
    ...
    // endpoint, secret は環境変数などで渡される
    // ExternalService は外部通信を行う構造体
    es, err := NewExternalService(endpoint, secret)
    if err != nil {
        panic(err)
    }

    ...
}
```

## No.49:エラーをラップすべきときを無視する p.160

エラーラッピング：エラーをラップして、元のエラーも利用できるようにすること。

### エラーラッピングの主なユースケース

- エラーに文脈情報を追加
    - `%v` verb
- エラーを特定エラーとしてマーク
   - `%w` verb

```go
func Foo() error {
    err := bar()
    if err != nil {
        // そのまま返す場合
        return err
        // 独自のエラー型でwrapして返す(Go1.13 以前はこの選択肢しかなかった)
        return BarError{Err: err}
        // 文脈情報を追加して返す。別のエラーに変換される
        return fmt.Errorf("bar failed: %v", err)
        // wrap して返す。元のエラーは利用可能なまま
        return fmt.Errorf("bar failed: %w", err)
    }
}
```

### エラーラッピングの選択肢

- エラーを特定の型としてマークする必要がある場合：独自のエラー型を使う
- 文脈情報を追加したい場合：`%w`, `%v` verb を使う
    - 使い分けは元のエラーを利用したい(`%w`)か否(`%v`)か

|選択肢|追加の文脈情報|エラーをマーク付け|元のエラーが利用可能|
|---|---|---|---|
|エラーを直接返す|x|x|o|
|独自のエラー型|可能(文字列フィールドを含む場合)|o|可能(元のエラーをアクセス可能にする場合)
|%w verb|o|x|o|
|%v verb|o|x|x|

## No.50:エラー型を不正確に検査する p163

ラップされたエラー型か特定の型か判定したい時は `errors.As` を使う。`errors.As` は再帰的にエラーをunwrapし、エラーが期待する型に一致する場合に true を返す

### 具体例

`TransientError` に一致するかの判定を行う

NG

```go
switch err := err.(type) {
// このケースだと、TransientError と完全一致しなければならない
// すなわち、TransientError が wrap されて別のエラーの配下にある場合、この判定は false になる
case TransientError:
    ...
default:
    ...
}
```

OK

```go
// TransientError のポインタを渡す
// err が wrapedError(TransientError{...}) のようになっていても true になる
if errors.As(err, &TransientError{}) {
    ...
} else {
    ...
}
```

## No.51: エラー値を不正確に検査する p167

sentinel error: グローバル変数として定義されたエラー。予期されるエラーを伝えるものでエラー値

```go
import "errors"

// 一般に `Err` の後にエラーの種類を続けるのが慣例
var ErrFoo = errors.New("foo")
```

### 具体例

標準ライブラリの `io` や `database/sql` に以下のような sentinel error が定義されている。これらは起こり得ることが予期できるので、事前に定義されている

- `sql.ErrNoRows`: クエリがレコードを返さなかった場合
- `io.EOF`: 入力がなくなった時。`io.Reader` から返される

### エラー型との使い分け

- 「予期される」エラーは sentinel error として定義すべき
- 「予期されない」エラーはエラー型として設計すべき
    - `type BarError struct {...}` のような形式

### sentinel error の wrap への対応

sentinel error も wrap できるため、比較の際は `errors.Is` を使う

```go
if errors.Is(err, sql.ErrNoRows) {
    ...
} else {
    ...
}

// if err == sql.ErrNoRows のように比較するのはNG
```

## No.52: エラーを2度処理する p.168

エラーを複数回処理することはGoに限らずやりがち。

### 具体例

```go
func hoge() error {
    // ...
    err := fuga()
    if err != nil {
        // fuga でエラーログを出力しているのに、ここでも出力している
        // これをエラーを2度処理するという状態
        // また、どのような要因でエラーが起きたかの文脈情報がログから抜けていて、調査しづらい
        log.Println("failed to hoge.")
        return err
    }
    return nil
}

func fuga() error {
    // ...
    if err != nil {
        log.Println("failed to fuga.")
        return err
    }
    return nil
}
```

### 対処方法

エラーの wrap を使う


```go
func hoge() error {
    // ...
    err := fuga()
    if err != nil {
        // 文脈を加えてエラーを返すことで、どのような要因でエラーが起きたかわかりやすい
        // また、利用者側でエラーログを出力したりリカバリーすることでエラーの処理を1度にまとめることができる
        // どのような要因でエラーが起きたか知りたいだけの場合は %v verb でも良い
        return fmt.Errorf("failed to hoge: %w", err)
    }
    return nil
}

func fuga() error {
    // ...
    if err != nil {
        return err
    }
    return nil
}
```

## No.53: エラーを処理しない p.171

以下のようにブランク識別子(`_`)にエラーを代入することでエラーを無視する。

https://github.com/kisielk/errcheck を使えば golangci-lint でNGな無視の仕方をしていないこともチェックできる

```go
func main() {
    _ = notify() // OK
    notify() // NG。意図して無視しているのか実装忘れか判断できない
}

func notify() error {
    // ...
}
```

## No.54: defer でエラーを処理しない p.172

### よくある defer の使い方と問題点

ファイル読み込みやsqlで取得したレコードを処理し終わった後、処理対象を Close するために `defer` を使うことがある

これらの `Close` は error を返すが、よくある以下のコードだとこれを処理していない

```go
func main() {
    // ...
    rows, err := db.Query(query)
    defer rows.Close()
}
```

### 対応方法

以下の例のように対応する。ポイントは以下

- err を defer 内のエラーで上書きをする前に err != nil をチェックする
- err != nil かつ defer 内のエラー != nil の時は err を何かしらの方法で優先させる

```go
func main() {
    // ...
    rows, err := db.Query(query)
    if err != nil {
        return nil, err
    }
    defer func() {
        closeErr = rows.Close()
        if err != nil {
            if closeErr != nil {
                // err を上書きしない処理をする
                // ログを出したり wrap したり
            }
            return
        }
        // 名前付きパラメータにエラーを代入する
        err = closeErr
    }()
    // ...
    // エラーの名前付きパラメータを返す
    return result, err
}
```
