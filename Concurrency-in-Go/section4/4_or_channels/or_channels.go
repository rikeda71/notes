package main

import (
	"fmt"
	"time"
)

func main() {
	// 可変長のチャネルを受け取り、1つのチャネルを返す
	var or func(channels ...<-chan interface{}) <-chan interface{}
	or = func(channels ...<-chan interface{}) <-chan interface{} {
		switch len(channels) {
		case 0: // 停止位置
			return nil
		case 1: // 停止位置 唯一存在するチャネルそのものを返却する
			return channels[0]
		}

		orDone := make(chan interface{})
		go func() {
			defer close(orDone)
			switch len(channels) {
			case 2: // チャンネルが2つだったら、channelの0、1番目がcloseされているか確認
				select {
				case <-channels[0]:
				case <-channels[1]:
				}
			default: // スライスの3番以降のチャネルから再帰的にorチャネルを作成して、selectを行う
				// スライスの残りの部分をorチャネルに分解して、最初のシグナルが帰ってくる木構造を形成する
				select {
				case <-channels[0]:
				case <-channels[1]:
				case <-channels[2]:
				case <-or(append(channels[3:], orDone)...): // ここで再帰している
				}
			}
		}()
		return orDone
	}

	/* 使い方 */
	// 指定した時間だけ待って、チャンネルをクローズするようなチャネルを返す
	sig := func(after time.Duration) <-chan interface{} {
		c := make(chan interface{})
		go func() {
			defer close(c)
			time.Sleep(after)
		}()
		return c
	}

	start := time.Now()
	<-or(
		sig(2 * time.Hour),
		sig(5 * time.Minute),
		sig(1 * time.Second),
		sig(1 * time.Hour),
		sig(1 * time.Minute),
	)

	// 一番短い1秒を待てば全てのチャネルが終了する
	fmt.Printf("done after %v", time.Since(start))
}
