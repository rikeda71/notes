# ConfigMap

環境変数・静的ファイルを key-valueペアとして格納する仕組み

## ConfigMap の生成・利用方法

- 作成

```shell
$ kubectl create configmap my-config \
  --from-literal=TEST_ENV=HELLO_WORLD \
  --dry-run \
  -o yaml > configmap.yml
$ kubectl apply -f configmap.yml
```

```yaml
apiVersion: v1

data:
  TEST_ENV: HELLO_WORLD
kind: ConfigMap
metadata:
  creationTimestamp: null
  name: my-config
```

- 利用

```yaml
...
spec:
  containers:
  - env:
    - name: TEST_ENV  # Pod などで利用する環境変数名
      valueFrom:
        configMapKeyRef:
          name: my-config  # configmap の定義名
          key: TEST_ENV    # configmap での key
...
```

## Volume マウント

ConfigMap では環境変数だけでなく、 Pod に対してファイルを Volume マウントすることができる。
Pod が消えるとファイルの更新内容も消えるので、write もしたいファイルである場合は、 Node 上に保存する `PersistentVolume` を使う

- Volume マウントの方法

```yaml
...
spec:
  volumes:
    - name: my-config-volume  # volumeの名称
      configMap:
        name: my-config  # configmap の定義名
        items:
        # ConfigMap内にあるKeyの名称
        - key: TEST_ENV
          path: keys
...
```

- 利用

```yaml
pec:
  containers:
  - image: ...
    name: ...
    ports:
    - containerPort: ...
    resources: {}
    volumeMounts:
    - name: my-config-volume  # volume 名
      mountPath: /my-config-valud  # Volumeをマウントするコンテナ内のファイルパスを指定
      readOnly: true  # 読み込み専用にしたい場合に付与
```

## Secret

Base64で値をエンコードして、Key-Valueペアとして保存するリソース
(Base64 なのて誰でもデコードできる点に注意)

### Secret の作成・利用方法

- 作成

```shell
$ kubectl create secret generic my-secret \
  --from-literal=SECRET_KEY1=SECRET_VALUE1 \
  --from-literal=SECRET_KEY2=SECRET_VALUE2 \
  --dry-run -o yaml
```

```yaml
apiVersion: v1
data:
  SECRET_KEY1: U0VDUkVUX1ZBTFVFMQ==
  SECRET_KEY2: U0VDUkVUX1ZBTFVFMg==
kind: Secret
metadata:
  creationTimestamp: null
  name: my-secret
```

- 利用

Volume マウントで利用する

```yaml
...
spec:
  containers:
  - image: ...
    name: ...
    ports:
    - containerPort: ...
    resources: {}
    volumeMounts:
    - name: my-secret-volume  # 作成したsecretを指定
      mountPath: /my-secret   # volume をマウントするパスを指定
      readOnly: true
...
```

## PersistentVolume

コンテナが書くデータをPod内のVolumeではなく、Node 上に存在する Persistent Volume に保存することで、Pod が消えても書いた内容が消えなくなる

### PersistentVolume の定義

- persistent volume

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv
spec:
  storageClassName: manual
  capacity:
    storage: 100M
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/mnt/pvc"
```

- persistent volume claim

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc
spec:
  storageClassName: manual
  accessModes:
    - ReadWriteOnce  # persistent volume と一致させる
  resources:
    requests:
      storage: 10M
```

### PersistentVolume の利用

```yaml
...
spec:
  containers:
  ...
  volumes:
    - name: my-pv  # volume 名
      persistentVolumeClaim:
        claimName: pvc  # 永続 volume 要求名
...
```
