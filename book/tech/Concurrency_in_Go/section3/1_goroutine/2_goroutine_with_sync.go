package main

import (
	"fmt"
	"sync"
)

func main() {
	// WaitGroupを使うことで、goroutineの終了を待つ
	var wg sync.WaitGroup
	sayHello := func() {
		defer wg.Done()
		fmt.Println("hello")
	}
	wg.Add(1)
	go sayHello()
	wg.Wait()
}
