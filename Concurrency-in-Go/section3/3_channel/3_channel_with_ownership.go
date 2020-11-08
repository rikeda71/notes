package main

import "fmt"

func main() {
	chanOwner := func() <-chan int {
		resultStream := make(chan int, 5) // バッファ付きチャネルを初期化
		// chanOwnerによってカプセル化
		go func() { // resultStreamへの書き込みを行うゴルーチンを起動
			defer close(resultStream) // 使い終わったら閉じる。所有者としての責務
			for i := 0; i <= 5; i++ {
				resultStream <- i
			}
		}()
		return resultStream // チャネルを返却。戻り値は読み込み専用チャネル
	}

	resultStream := chanOwner() // 読み込み専用チャネルを用意
	for result := range resultStream {  // 消費者として、チャネルのブロックとチャネルを閉じたことだけに注意
		fmt.Printf("Received: %d\n", result)
	}
	fmt.Println("Done receiving!")
}
