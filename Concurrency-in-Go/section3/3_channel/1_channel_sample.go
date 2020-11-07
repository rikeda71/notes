package main

import "fmt"

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
}
