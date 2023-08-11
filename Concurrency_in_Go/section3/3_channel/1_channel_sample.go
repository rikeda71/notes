package main

import (
	"fmt"
	"sync"
)

func main() {
	// チャネルを宣言、初期化
	// dataStream := make(chan interface{})
	// 受信専用チャネルを初期化して宣言
	// receiveChan := make(chan<- interface{})
	// 送信専用のチャネルを初期化して宣言
	// sendChan := make(<-chan interface{})
	// 型を指定して、チャネルを宣言
	// intStream := make(chan int)
	stringStream := make(chan string)
	go func() {
		stringStream <- "Hello channels!"
	}()
	fmt.Println(<-stringStream)

	//　真偽値の受け取り
	close(stringStream)
	salutation, ok := <-stringStream
	fmt.Printf("(%v): %v", ok, salutation)

	// closeの応用
	// closeでgoroutineにシグナルを送ってgoroutineのブロックを解除することができる
	intStream := make(chan int)
	go func() {
		defer close(intStream)
		for i := 1; i <= 5; i++ {
			intStream <- i
		}
	}()

	for integer := range intStream {
		fmt.Printf("%v ", integer)
	}

	begin := make(chan interface{})
	var wg sync.WaitGroup
	for i := 0; i < 4; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			<-begin
			fmt.Printf("%v has begun\n", i)
		}(i)
	}
	fmt.Println("Unblocking goroutines...")
	close(begin)
	wg.Wait()
}
