package main

import "fmt"

func main() {
	// for { // 無限ループまたは何かのイテレーションを回す
	// 	select {
	// 	// チャネルに対して何かを行う
	// 	}
	// }

	// チャンネルからの繰り返し変数を送出する
	done := make(chan interface{})
	stringStream := make(chan string, 3)
	for _, s := range []string{"a", "b", "c"} {
		select {
		case <-done:
			return
		case stringStream <- s:
		}
	}

	// 停止シグナルを待つ無限ループ

	close(done)
	for {
		select {
		case <- done:
			return
		default:
			// ここでdoneが閉じられていないときの処理をしてもいい
			fmt.Println("wait for closing done...")
		}
		// 割り込みできない処理をする
	}

}
