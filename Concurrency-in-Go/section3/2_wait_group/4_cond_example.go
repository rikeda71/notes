package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	c := sync.NewCond(&sync.Mutex{}) // make cond instance
	queue := make([]interface{}, 0, 10)

	removeFromQueue := func(delay time.Duration) {
		time.Sleep(delay)
		c.L.Lock() // forループのクリティカルセッションをc.L.Unlock()で抜けた後クリティカルセッションに入る
		queue = queue[1:]
		fmt.Println("Removed from queue")
		c.L.Unlock() // クリティカルセッションを抜ける
		c.Signal()   // ゴルーチンに何かが起きたことを知らせる ここで、waitに知らせている
	}

	for i := 0; i < 10; i++ {
		c.L.Lock()            // LockerのLocfkメソッドを呼び出して、クリティカルセッションに入る
		for len(queue) == 2 { // ループ内でキューの長さを確認して、waitを呼び出す
			c.Wait()
		}
		fmt.Println("Adding to queue")
		queue = append(queue, struct{}{})
		go removeFromQueue(1 * time.Second) // 1秒後にキューから取り出すgoroutineを作成
		c.L.Unlock()                        // 要素をキューに追加できたので、クリティカルセッションを抜ける
	}
}
