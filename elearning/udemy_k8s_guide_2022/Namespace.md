# Namespace

1つのクラスタ内で、仮想クラスタに分けられる機能。
開発・qa・テストみたいな感じで分けられる。

## 使い方

```shell
$ kubectl get ns  # namespace 一覧を取得
$ kubectl create namespace ${NS}  # namespace を作成
$ kubectl get pod --namespace ${NS}  # ある namespace に存在する pod 一覧を取得
$ kubectl run ... --namespace ${NS} # namespace を指定してリソースを作成
```
