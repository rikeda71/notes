package main

import (
	"sync"
	"testing"
)

// BenchmarkContextSwitch コンテキストスウィッチの時間計測
func BenchmarkContextSwitch(b *testing.B) {
	var wg sync.WaitGroup
	begin := make(chan struct{})
	c := make(chan struct{})

	var token struct{}
	sender := func() {
		defer wg.Done()
		<-begin // 開始するまで待機
		for i := 0; i < b.N; i++ {
			c <- token //受信側にメッセージ送信
		}
	}
	receiver := func() {
		defer wg.Done()
		<-begin // 開始するまで待機
		for i := 0; i < b.N; i++ {
			<-c // メッセージを受信
		}
	}
	wg.Add(2)
	go sender()
	go receiver()
	b.StartTimer() // タイマー起動
	close(begin)   // 開始
	wg.Wait()
}
