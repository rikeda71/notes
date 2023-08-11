package main

import (
	"fmt"
	"time"
)

func main() {
	doWork := func(
		done <-chan interface{},
		pulseInterval time.Duration,
	) (<-chan interface{}, <-chan time.Time) {
		// ハートビートを送信する先のチャネルを設定
		// このチャネルを return で返却
		heartBeat := make(chan interface{})
		results := make(chan time.Time)
		go func() {
			defer close(heartBeat)
			defer close(results)

			// 与えられた time.Duration の間隔でハートビートの鼓動を設定
			// pulseInterval ごとにこのチャネルでは何かしら読み込みができる
			// ticker を close できないことに注意
			pulse := time.Tick(pulseInterval)
			// 仕事が入ってくる様子のシミュレートに使われるティッカー
			// 仮の値
			workGen := time.Tick(2 * pulseInterval)

			sendPulse := func() {
				select {
				case heartBeat <- struct{}{}:
				// default句により、誰もハートビートを確認していない可能性を考慮
				default:
				}
			}

			sendResult := func(r time.Time) {
				for {
					select {
					case <-done:
						return
					case <-pulse:
						sendPulse()
					case results <- r:
						return
					}
				}
			}

			for {
				select {
				case <-done:
					return
				// done と同様に、送信や受信を行うときはいつでもハートビートの鼓動に対する条件を含める
				case <-pulse:
					sendPulse()
				case r := <-workGen:
					sendResult(r)
				}
			}
		}()
		return heartBeat, results
	}

	done := make(chan interface{})
	// 十秒後にdoneを閉じる
	time.AfterFunc(10*time.Second, func() { close(done) })
	// タイムアウト設定
	const timeOut = 2 * time.Second

	// ハートビートはタイムアウト / 2 の速度で鼓動する
	heartbeat, results := doWork(done, timeOut/2)

	for {
		select {
		// ハートビートから鼓動を受け取る
		case _, ok := <-heartbeat:
			if !ok {
				return
			}
			fmt.Println("pulse")
		case r, ok := <-results:
			if !ok {
				return
			}
			fmt.Printf("results %v\n", r.Second())
		case <-time.After(timeOut):
			return
		}
	}
}
