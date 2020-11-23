package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	newRandStream := func(done <-chan interface{}) <-chan int{
		// goroutineのcloseをメソッド内に隠蔽することで、確実にgoroutineをメモリから削除できる
		randStream := make(chan int)
		go func() {
			defer fmt.Println("newRandStream closure exited.")
			defer close(randStream)
			for {
				select {
				case randStream <- rand.Int():
				// 終了命令は外から受け取る
				case <-done:
					return
				}
			}
		}()
		return randStream
	}

	done := make(chan interface{})
	// 終了命令は利用者が渡す
	// doneがメソッドの外からcloseされたら終了となる
	randStream := newRandStream(done)
	fmt.Println("3 random ints;")
	for i := 1; i <= 3; i++ {
		fmt.Printf("%d: %d\n", i, <-randStream)
	}
	close(done)
	time.Sleep(1)
}
