package main

import (
	"fmt"
	"sync"
)

type Button struct { // 1. 条件を含むButton型の定義
	Clicked *sync.Cond
}

func main() {
	button := Button{Clicked: sync.NewCond(&sync.Mutex{})}

	subscribe := func(c *sync.Cond, fn func()) { // 2. 条件に応じて送られてくるシグナルを扱う関数を登録するための関数を定義
		var goroutineRunning sync.WaitGroup
		goroutineRunning.Add(1)
		// ハンドラはそれぞれのゴルーチン上で動作し、ゴルーチンが実行されていると確認できるまで終了しない
		go func() {
			goroutineRunning.Done()
			c.L.Lock()
			defer c.L.Unlock()
			c.Wait()
			fn()
		}()
		goroutineRunning.Wait()
	}

	var clickRegistered sync.WaitGroup // 3. マウスボタンが話された時のハンドラを設定
	clickRegistered.Add(3)
	subscribe(button.Clicked, func() { // 4. プログラムが終了しないようにWaitGroupの作成
		fmt.Println("Maximizing window.")
		clickRegistered.Done()
	})
	subscribe(button.Clicked, func() { // 5. クリックされた時、ボタンがあるウィンドウを最大化
		fmt.Println("Displaying annoying dialog box!")
		clickRegistered.Done()
	})
	subscribe(button.Clicked, func() { // 6. ダイアログボックスを表示するのをシミュレ＝としたハンドラを登録
		fmt.Println("Mouse clicked.")
		clickRegistered.Done()
	})
	button.Clicked.Broadcast() //  7. アプリケーションボタンをクリックした状態からマウスボタンを離した状態をシミュレート
	clickRegistered.Wait()
}
