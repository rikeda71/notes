# 第6章 ドメインの完全性と整合性

- 完全性 : それぞれのデータが正しいビジネスルールに従っている
- 整合性 : ドメインモデルの異なる部分が事実について一致している

## 6.1 単純な値の完全性

- ドメインの定義に応じて用意したモデルで validation すればいい
- 関数型プログラミングでは、**スマートコンストラクタ** アプローチと呼ぶ

```ts
type UnitQuantity = number;

// UnitQuantity の値域は 0 < n < 1000
const NewUnitQuantity = (quantity: number): Result<UnitQuantity, Error> => {
    if (quantity < 1) {
        return err(new Error("UnitQuantity can not be negative."));
    }

    if (quantity > 1000) {
        return err(new Error("UnitQuantity can not be more than 1000."));
    }

    return ok(quantity);
}
```

## 6.3 型システムによる不変条件の強制

不変条件 : 他に何が起こっても真であり続ける条件のこと

例
- 値域は常に 1 ~ 1000 の整数でなければならない
- 1つの注文には必ず、少なくとも1つの明細行が存在しなければならない

実現可能なら、このような制約を型で表現してもよい。型で表現することで、制約が自動で適応され、要件に対するユニットテストを書く必要がない。

```ts
// 1つの注文には必ず、少なくとも1つの明細行が存在しなければならない
type NonEmptyList<T> = [T, ...T[]];

const orderLines: NonEmptyList<OrderLine> = [] // compile error
```

## 6.4 ビジネスルールを型システムで表現する

例えば、以下のような要件があるとする。

- 顧客のメールアドレスを管理する
- あるメールアドレスは検証済み（顧客が検証メールを受け取り、検証リンクをクリックした）、あるメールアドレスは未検証
- 検証済みのアドレスは有効
- 検証メールは、「未検証」のメールアドレスにのみ送信すべき
- パスワードリセットのメールは検証済みのメールアドレスにのみ送信すべき

「検証済み」かの情報を持てばいい。愚直に実装するなら以下のようになる

```ts
type CustomerEmail = {
    emailAddress : EmailAddress;
    isVerified : boolean;
}
```

この方針には以下の課題がある。

- `isVerified` がいつ、何のために設定され、解除されるのか が明確でない
- セキュリティ侵害の可能性がある。実装ミスで isVerified に値を設定し間違えると、パスワードリセットを未検証なメールアドレスに送ることもできる
- (書籍には書かれてないが) 検証・未検証、以外の条件を取りえることもある

ドメインに注目すると、メールには「検証」「未検証」のものがあることがわかる。

これをモデル化すると以下のように定義できる。
さらに、`VerifiedEmailAddress` は検証を行うコードと同じモジュールで private constructor によってのみ初期化されるようにすることで、実装ミスも防げる。

```ts
type CustomerEmail =
    | EmailAddress
    | VerifiedEmailAddress
```

また、このように実装すると、コードでドメインをよりよく文書化できる。
例えば、「パスワードリセットのメールは検証済みのメールアドレスにのみ送信すべき」を型を使って表現できる。

```ts
const sendPasswordResetEmail = (email: VerifiedEmailAddress) => {
    ...
}
```

このように実装することで、誤って未検証のメールアドレスを渡してしまうビジネスルールを破ることはなくなる

次に、以下のような要件があるとする

顧客は以下のように情報を持つ
- メールアドレスのみ
- 住所のみ
- メールアドレスと住所を持つ

この情報を愚直にモデル化するなら、以下のようになる。

```ts
type ContactMethods = {
    email?: Email
    address?: PostalAddress
}
```

しかし、このモデルはメールアドレスも住所も持たないことを表現可能である。
このようなモデルはビジネスルールを違反してしまう。

以下のように型を使って定義できる。このようにすることで、上記のビジネスルールを破ってしまうことがなくなる。

```ts
type EmailOnlyContactMethods = {
    email: Email
}
type AddressOnlyContactMethods = {
    address: PostalAddress
}
type BothContactMethods = {
    email: Email
    address: PostalAddress
}

type ContactMethods =
    | EmailOnlyContactMethods
    | AddressOnlyContactMethods
    | BothContactMethods

```

## 6.5 整合性

整合性はビジネス用語

### 6.5.1 1つの集約内での整合性

- 整合性を確保する最も簡単な方法は、情報を保存するのではなく、生データから計算すること
- データを永続化する必要がある場合、そのデータは同期が取れた状態にする必要がある
- これを達成するために、集約、が利用できる
- 集約は原子性の単位

### 6.5.2 異なるコンテキスト間の整合性

- 境界づけられたコンテキスト間の整合性は API などを経由して、担保する
- 外部通信になることでたまにうまくいかないこともある。しかし、現実的に更新を同期させる（ 2 phase commit ）ような仕組みは過剰。稀なエラーに個別に対処する方がコスパがいい

### 6.5.3 同じコンテキストの集約間の整合性

- 複数の集約が関係している場合、結果整合性を使用すべき
- 特には、1ワークフローで複数集約の更新を1トランザクションで行う必要も出てくる
  - 金額の反映など
- このような場合、トランザクション自体が DDD のエンティティとみなせる。このような処理のためだけのワークフローや集約を定義してもいい

### 6.5.4 同一データに作用する複数の集約

- 多くの場合、型を使って制約をモデル化すれば、複数の集約間で制約を共有できる
