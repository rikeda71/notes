# Service

Pod をクラスタ内外に公開する静的IPを持ったL4のLB。
クラスター内外から Pod への安定的なアクセスを提供できる仮想の IP アドレスを Service に割り当てる。
Pod にも IP が付与されているが、Pod は消えることもあるので、Service を通じて接続することで、1Pod が消えても他のPodに接続できる。
LBなので負荷分散もできる。

## ClusterIp

いつ消えるかわからないPodIPを抽象化できる。
StaticIPを持ったProxyをPodの前段におくイメージ。
クラスタ内部でのみ通信可能（別 Pod から ClusterIP で公開した静的IPは接続できるが、クラスタ外からアクセスできない）

```shell
$ kubectl expose pod helloworld --type ClusterIP --port 8080 --name helloworld-clusterip
```

## NodePort

クラスタの外へのPodの公開ができるService。

```shell
$ kubectl expose pod helloworld --type NodePort --port 8080 --name helloworld-nodeport
$ minikube service helloworld-nodeport --url  # minikube での外部公開
```

## LoadBalancer

クラウドプロバイダ（AWS, GCP）のL4LBのDNSから、各ノードの特定ポートにルーティングしてPodにアクセスできる。
NodePort の場合は NodePort の IP を知らないと外部からアクセスできないが、LoadBalancer Service を使うと LB に指定された DNS を知っておくだけでアクセスできる。

```shell
$ kubectl expose pod helloworld --type LoadBalancer --port 8080 --name helloworld-lb
$ minikube service helloworld-lb --url  # minikube での外部公開
```

### 注意点

- 1つのServiceごとに1つのLBが作られてしまうため、Serviceを複数作るとLBもそれだけ増えて高コスト。
- L4（トランスポートレイヤー）のLBなのでTCP/IPまでしか理解できてない。HTTPが理解できない。
  - ホスト名、パスを使った LB の振り分けを利用したい場合、 `Ingress` を使う

## Reference

- https://kubernetes.io/ja/docs/concepts/services-networking/service/
