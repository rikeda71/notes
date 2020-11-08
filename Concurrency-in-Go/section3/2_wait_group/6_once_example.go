package main

import (
	"fmt"
	"sync"
)

func main() {
	var cnt int
	increment := func() {
		cnt++
	}

	var  once sync.Once
	var increments sync.WaitGroup
	increments.Add(100)
	for i := 0; i < 100; i++ {
		go func() {
			defer increments.Done()
			once.Do(increment)
		}()
	}

	increments.Wait()
	fmt.Printf("Count is  %d\n", cnt)
}
