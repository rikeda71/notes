package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	salutation := "hello"
	wg.Add(1)
	go func() {
		defer wg.Done()
		salutation = "welcome"
	}()
	wg.Wait()
	// Waitで代入処理をまっているので、ここでは`welcome`が表示される
	fmt.Println(salutation)
	for _, sal := range []string{"hello", "greetings", "good day"} {
		wg.Add(1)
		go func(salutation string) {
			defer wg.Done()
			// ここで、メソッド外の`sal`をprintした場合、forのほうがgoroutineの開始より早いので
			// forの処理が終了した後にsalの値を出力するので、全てgood dayが出力されてしまう
			// salutationはメソッドローカルな変数で値参照にしているため、値が新しいメモリに格納されてうまく動作する
			fmt.Println(salutation)
		}(sal)
	}
	wg.Wait()
}
