package main

import (
	"fmt"
	"sync"
)

func main() {
	myPool := &sync.Pool{
		New: func() interface{} {
			fmt.Println("Creating new instance.")
			return struct{}{}
		},
	}

	myPool.Get() // インスタンスを初期化
	instance := myPool.Get() // インスタンスを初期化
	myPool.Put(instance) // インスタンスをプールに戻す。利用できるインスタンス数が1増える
	myPool.Get() // 上でプールに戻されたインスタンスが渡される
}
