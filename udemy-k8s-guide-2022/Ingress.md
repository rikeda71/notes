# Ingress

Pod をクラスタ内外に公開するL7LB。
クラスター外部から URL のホスト・パスによるServiceへの振り分けが可能。
（1つのLBから複数のServiceへの振り分けが可能）

## minikube での設定

```shell
$ minikube addons enable ingress
```

## minikube で Ingress Resource でパスを定義

GKE や EKS で Ingress を作成する場合は別途アドオンをインストールする必要あり。
`/` にリクエストが来ると `helloworld-nodeport` の 8080 port にリクエスト

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: helloworld
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$1
spec:
  rules:
  - http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: helloworld-nodeport
            port:
              number: 8080
```

```shell
$ kubectl apply -f ingress.yml
$ kubectl get ingress  # 作成された ingress の確認
```
