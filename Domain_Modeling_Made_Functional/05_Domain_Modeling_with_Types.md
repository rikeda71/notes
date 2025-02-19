# 第5章 型によるドメインモデリング

- F# でドメインモデルをコード化する

## 5.2 ドメインモデルのパターンを見る

モデルの構成要素は以下

- 単純な値。ただし、int や string ではなく、OrderId や ProductCode など、ユビキタス言語の概念で考える
- AND による値の組み合わせ。例えば、名前、住所、注文など
- OR による選択肢。例えば、Order(注文) または Quote(見積)
- Workflow。input, output を持つビジネスプロセス

これらを組み合わせてモデリングしていく

## 5.3 単純な値のモデリング

- プリミティブな言語特有の型を使うのではなく、ドメインの定義に合わせてモデリングする

```ts
interface CustomerId {
    value: string;
}
// または
// type CustomerId = string
```

```java
record ProductCode(
    String value
) {
}
```

- そうすることで、誤って利用してしまうことが減る
- 例えば、String を受け付けるメソッドなら、CustomerId も ProductCode も受け付けれてしまう。ProductCode だけ期待しているメソッドなら、CustomerId を引数に渡したらコンパイルエラーで始める（誤って指定できなくなる）
- Java のアプローチとだと、多少、メモリ使用量と効率性の犠牲が伴う。TypeScript の型エイリアスを張る例だと、この観点をクリアできる


## 5.4 複雑なデータのモデリング

クラスや構造体にフィールドを生やすだけ

```ts
interface Order {
    customerInfo: CustomerInfo
    shippingAddress: ShippingAddress
    billingAddress: BillingAddress
    orderLines: OrderLine[]
    AmoutToBill: ...
}
```

### 5.4.2 未知の型のモデリング

- 設計プロセスの初期段階では、モデリングに関する質問に明確な答えが得られないことがよくある
- 未定義の型をエイリアスとして定義して、答えが得られたモデルからコード化していくといい

```ts
// TypeScript なら、unknown が使える
type CustomerInfo = unknown;
type ShippingAddress = unknown;
type BillingAddress = unknown;
type OrderLine = unknown;
type BillingAmout = unknown;

interface Order {
    customerInfo: CustomerInfo;
    shippingAddress: ShippingAddress;
    billingAddress: BillingAddress;
    orderLines: OrderLine[];
    AmoutToBill: BillingAmount;
}
```

### 5.4.3 選択型によるモデリング

言語仕様として提供されている場合、直和型を使って表現する。

```ts
type ProductCode = WidgetCode | GizmoCode
type OrderQuantity = UnitQuantity | KilogramQuantity
```

## 5.5 関数によるワークフローのモデリング

- 注文書を検証するワークフローのステップなら、以下のように文書化可能
- `type ValiteOrder = UnvalidatedOrder -> ValidatedOrder`

### 5.5.1 複雑な入力と出力の処理

- 複雑な入力・出力であっても、フィールドを複数持たせるだけで表現できる

```ts
interface PlaceOrderEvents {
    acknowledgmentSent: AcknowledgmentSent;
    orderPlaced: OrderPlaced;
    billableOrderPlaced: BillableOrderPlaced;
}
```

- A/B のどちらかが出力される場合、複数型を使って表現できる

```ts
type PlaceOrderOutput = AOutput | BOutput;
```

### 5.5.2 関数のシグネチャでエフェクトを文書化する

- ワークフローの処理が失敗する可能性がある場合、Result 型を返すことで、成功・失敗のどちらかを取りえる出力を作れる

```ts
// TypeScript だと、https://github.com/supermacro/neverthrow などで Result 型を表現できる
type ValidatedOrderOutput = () => Result<ValidatedOrder, ValidationError>
```

## 5.6 アイデンティティの考察: 値オブジェクト

DDD では

- 永続的なアイデンティティを持つオブジェクト: エンティティ
- 永続的なアイデンティティを持たないオブジェクト: 値オブジェクト
    - ドメインモデルで頻繁に現れる

## 5.7 アイデンティティの考察: エンティティ

- 時間による変化が予想される -> 識別子（ID など）を持つ理由につながる

## 5.8 集約

DDD では、

- 個々のエンティティには独自の ID がある
- トップレベル（ドメインの定義でルートにある）のエンティティ

である場合、トップレベルのエンティティを集約ルートと呼ぶ
