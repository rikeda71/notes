package main

import (
	"bytes"
	"fmt"
	"os"
)

func main() {
	var dataStream chan interface{}
	// バッファ付きチャンネルの定義
	// 読み込みが行われなくても、4回まで書き込み可能
	// キャパシティ：4
	dataStream = make(chan interface{}, 4)
	// バッファなしチャンネル
	// a := make(chan int)
	// b := make(chan int, 0)
	dataStream <- 'a'
	dataStream <- 'b'
	dataStream <- 'c'
	dataStream <- 'd'
	go func() {
		dataStream <- 'e' // block
	}()
	go func() {
		fmt.Println(<-dataStream) // 'a'を読み込み&eを書き込めるようになる
	}()

	// バッファ付きチャネルの利用例
	var stdoutBuff bytes.Buffer
	defer stdoutBuff.WriteTo(os.Stdout)
	intStream := make(chan int, 4)
	go func() {
		defer close(intStream)
		defer fmt.Fprintln(&stdoutBuff, "Producer Done.")
		for i := 0; i < 5; i++ {
			fmt.Fprintf(&stdoutBuff, "Sending: %d\n", i)
			intStream <- i
		}
	}()

	for integer := range intStream {
		fmt.Fprintf(&stdoutBuff, "Received %v.\n", integer)
	}
}
