# Reprica・Deployment

## Reprica

Replica は Pod を複製する仕組み
ReplicaSet でレプリカ数を指定しておくと、1Podが死んでもレプリカ数を満たすように Pod を再生成し直す

### Replica の apply

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: helloworld
  labels:
    app: helloworld
spec:
  replicas: 2
  selector:
    matchLabels:
      app: helloworld
  template:
    metadata:
      labels:
        app: helloworld
    spec:
      containers:
      - name: helloworld
        image: gcr.io/google-samples/hello-app:1.0
```

```shell
$ kubectl apply -f replicaset.yaml
$ kubectl get replicaset  # 確認
$ kubectl scale --replicas=5 replicaset/helloworld  # helloworld はレプリカセットの名称
$ kubectl delete pod ${POD_ID} # 削除しても
$ kubectl get pods  # 新しく Pod が自動生成されているはず（数が減っていない）
```

## Deployment

Pod の Deploy時に新しい Replica Set を作成し、古い ReplicaSet 管理下の Pod を削除しながら段階的に Pod を置き換えていく仕組み
ロールバックも段階的に可能

### Deployment のデモ

```shell
$ kubectl create deployment --image gcr.io/google-samples/hello-app:1.0
$ kubectl get deployment  # deployment を確認
# image を更新
$ kubectl set image deploy/helloworld hello-app=gcr.io/google-samples/hello-app:2.0
$ kubectl roolout history # image の更新を確認
```

## References

- https://kubernetes.io/ja/docs/concepts/workloads/controllers/deployment/
