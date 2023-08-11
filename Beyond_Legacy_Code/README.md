# レガシーコードからの脱却 ―ソフトウェアの寿命を延ばし価値を高める9つのプラクティス

- URL: https://www.oreilly.co.jp/books/9784873118864/
- 価格: 2,552円

## 概要

> レガシーコードとは、バグを多く含み、壊れやすく拡張が難しいコードを指します。このようなコードの保守と管理には多大な労力がつぎ込まれることになります。しかも一度作ってしまったレガシーコードの質を上げるには、初めから質の高いコードを作るよりも膨大なコストがかかります。
> 本書では、ソフトウェア開発において、初めからレガシーコードを作りださないためのプラクティスを9つ挙げて解説します。プロダクトオーナーは目的を語り、やり方は開発者に任せること、小さなバッチで開発を進めること、継続的に統合すること、チームメンバーで協力することなど、日々の開発に取り入れる考え方と具体的な実践について各章で分かりやすく解説します。
> 信頼性や拡張性が高いソフトウェアをリリースしたい開発者、運用管理者、マネージャに必携の一冊です。

## まとめ

- レガシーコードから脱却する具体的な方法として9つのプラクティスを提唱
  1. やり方より先に目的、理由、誰かのためかを伝える
  2. 小さなバッチで作る
  3. 継続的に統合する
  4. 協力しあう
  5. 「CLEAN」コードを作る
  6. まずテストを書く
  7. テストで振る舞いを明示する
  8. 設計は最後に行う
  9. レガシーコードをリファクタリングする

## 6 まずテストを書く

### (スクラムの)ストーリーを分解する7つの戦略

複数のことが混じったストーリーを要素に分解する

- ストーリーがサブストーリーで構成されている場合、それを複数のストーリーに分解

複雑なストーリーを既知のこと・未知のことで分解する

- ストーリーが複雑なのは未知のことを含んでいるため

未知のことをわかるまで繰り返す

- 何が未知なのか判別できたらそれをカプセル化。インターフェースを定義して抽象化 -> 後ろに隠す

受け入れ基準をもとに分解する

- 多数が終わったかどうかを目にみえる形で判断する証拠が欲しい -> **受け入れ基準**をもとにストーリーを分割すれば、イテレーションで顧客価値を提供しながら開発に集中する手助けになる

依存関係を最小にする

- ストーリーは他のストーリーに依存しない方がいい

意図を1つにする

- ストーリーは単一の意図を満たすようなものであるべき

ストーリーをテスト可能に保つ

- **受け入れ可能**であることを証明できるようにするため、受け入れテストを持つべき。

## 13 レガシーコードをリファクタリングする

### ストラングラーパターン

システムを停止せずにコンポーネントを変更する場合は、このパターンを使う。（マーチン・ファウラー; 2004）

古いサービスをラッピングする形で新しいサービスを作り、最終的に古いサービスがなくなるまでゆっくりと置き換えていくパターン