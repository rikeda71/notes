# テスト駆動開発

- URL: https://www.amazon.co.jp/%E3%83%86%E3%82%B9%E3%83%88%E9%A7%86%E5%8B%95%E9%96%8B%E7%99%BA-Kent-Beck/dp/4274217884
- 価格: 2,772

## 概要

> 本書は、自分たちのコードに自信を持って開発を続けたいプログラマ、チームリーダー向けに、テスト駆動開発(TDD)の実践方法を解説した“Test-Driven Development By Example"の日本語版です。テスト駆動開発の考案者であるKent Beck自身によって書かれた原典を、日本におけるテスト駆動開発の第一人者である和田卓人氏が訳しました。
> テスト駆動開発とは単にテスト自動化を行うことではなく、ユニットテストとリファクタリングを両輪とした小さいサイクルを回すことで不確実性を制御し、不断の設計進化を可能にする手法であることを、実例を通して学ぶことができます。

## ２５ テスト駆動開発のパターン

### TODOリスト

何をテストすべきか: 着手する前に必要になりそうなテストをリストに書き出しておく

- コードを書くときにストレスに悩まされないコツは、どこに行くべきかがわかるまで動き出さないこと
- やるべきことを記憶するのは難しいので、記録しておく

### テストファースト

いつテストを書くべきか: テスト対象のコードを書く前

\=> TDD の考え方

### テストデータ

テストファーストを扱うデータ: テストを読みやすく、理解しやすくなるデータを使う

- テストには読み手がいる
- データを散らかすだけ散らかして、そのままにしてはならない
- **データに違いがあるのなら、その違いは意味のあるものでなければならない**

#### 違いを表すためのテクニック

1. **同じ値は1つのものを表すためだけに使う**
   - 引数の順番によって同じ型で同じ値を入れた時、逆になった場合にどうなるか考えてしまう

2. **本物に近いデータ**
   - 実際に使われているデータをテストに使用

## 26 レッドバーのパターン

いつどこにテストを書き、いつやめるか

### はじめのテスト

どのテストから始めるか: 「何もしないこと」のテストから始める

- 本物に近いテストを書き始めると一度に複数の問題に直面する
- 本物に近いテストを書き始めると、FBを得るまでに時間がかかってしまう
  - FB: テストが成功したか、失敗したか（レッド、グリーンを出すのに時間がかかる）

次に書き始めるテスト: TODOリストの残りのうち、学ぶものがありそう & すぐに書けそうなテストを選ぶ

- 機能が1つか2つ必要になるテストを書いてみる
- （面倒くさそうで込み入ったものに立ち向かう時は、立ち向かう前に勇気を出す）
- はじめのテスト: **抽象度の高いアプリケーションテストに近いテスト**を書くと良い

### 脱線はTODOリストへ

脇道に逸れず、技術的な疑問を検証するには: 脱線しそうなら、疑問をTODOリストに加え、元の仕事に戻る

- プログラミングにはブレークスルーが必要な瞬間があるが、日常のプログラミングは平凡
- 平凡だからこそ、脇道に逃げがち
- 脱線（思いついたステキなアイデア）はTODOリストに書いておき、手掛けていた仕事に戻る

### 回帰テスト

不具合が報告された時、まず何をやるべきか: **不具合を再現させる最小のテストケース** を書き、失敗を見届ける。テストがパスしたら不具合が解消されたと判断

- 回帰テスト: 本来、コードを書いた時に同時に書かれるべきであったテスト
- 書くべきことにどうやったら気づけたかを考える必要がある

アプリケーションレベルのテストの大きな意味: 何が違って、本来どうあるべきかを顧客と話すときの拠り所

- (もっと細かい粒度の回帰テストは開発者がテストを強固にするためにある)

## 27 テスティングのパターン

テストを書くことに焦点を当てたパターン

### 小さいテスト

あまりに大きくなってしまったテストが失敗したとき: 大きいテストから問題箇所を絞り込んだ小さいテストを書く。

- 小さいテストだけ走らせて、小さいテストが通るようになったら大きいテストに戻る
- レッド・グリーン・リファクタリングのリズムは成功を続けるための生命線: 必須で守る
- ↑を守るため、小さい粒度にテストを落とし込む

## 29 xUnitのパターン

xUnit系のテスティングフレームワークを使う際のパターンを説明

### アサーション

コードがきちんと動いているかを真偽値で返し、判断を自動で行う

- `assertTrue` のような真偽値を検証するアサーションではなく、等価性の判定ができるアサーションを使う(`assertEquals`, `assertThat`, etc...)

public な振る舞いのみでテストを書くべき

- オブジェクトをブラックボックスとして捉えるため
- ホワイトボックステストを書きたくなるのは、テストの問題ではなく、設計の問題
  - コードがきちんと動いているかどうかを変数を使って確かめたくなるとき => 設計を改善する機会
  - 不安に負けて変数をチェックしたとき => 改善の機会が失われる
  - それでも設計を思い浮かばないとき => 後日のためのメモを残して先に進む

### フィクスチャー(fixture)

複数のテストから使われる共通のオブジェクトを作るには: テストメソッド内のローカル変数をインスタンス変数に引き上げ、オーバーライドした `setUp` メソッドの中で初期化を行う

- プロダクトコードの重複を取り除きたいのがエンジニア
- ならば、テストコードの重複も取り除きたくなる
- 重複は以下の点で悪
  - 書くのに時間がかかる。コピペでも
  - interface を手で変更するときに、複数箇所を修正する必要がある

重複の利点: テスト準備コードが読みやすくなる

- テストの前提条件がわかりやすくなる利点もある
- 正し、ほとんど全ての場合、共通コードを抽出する方（重複を取り除く方）がわかりやすい
