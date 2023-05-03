# kubectl apply

k8s の Declarative yaml は `kubectl (run|expose) ... --dry-run -o yaml` で自動生成することができる

## サンプル

- Pod

  ```shell
  kubectl run \
      --port 8080 \
      --image gcr.io/google-samples/hello-app:1.0 \
      --restart Never \
      --dry-run \
      -o yaml \
      helloworld > pod.yaml
  ```

- Service

  ```shell
  kubectl expose pod helloworld \
      --type ClusterIP \
      --port 8080 \
      --name helloworld-clusterip \
      --dry-run \
      -o yaml > service.yaml
  ```

- Deployment

  ```shell
  kubectl run \
      --port 8080 \
      --image gcr.io/google-samples/hello-app:1.0 \
      --dry-run \
      -o yaml \
      helloworld > deployment.yaml
  ```

`kubectl run --restart` オプションで Pod, Deployment, Job を区別できる

    --restart Never => Pod
    --restart Always => Deployment
    --restart OnFailure => Job

その後、`kubectl apply -f`を使って起動・停止

- YAMLに定義されたリソースを作成する

  ```shell
  kubectl apply -f pod.yaml
  ```

- YAMLに定義されたリソースを削除する

  ```shell
  kubectl delete -f pod.yaml
  ```
