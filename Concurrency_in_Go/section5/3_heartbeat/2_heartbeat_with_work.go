package main

import (
	"fmt"
	"math/rand"
)

func main() {
	doWork := func(
		done <-chan interface{},
	) (<-chan interface{}, <-chan int) {
		heartBeatStream := make(chan interface{}, 1)
		workStream := make(chan int)
		go func() {
			defer close(heartBeatStream)
			defer close(workStream)

			for i := 0; i < 10; i++ {
				select {
				case heartBeatStream <- struct{}{}:
				default:
				}

				select {
				case <-done:
					return
				case workStream <- rand.Intn(10):
				}
			}
		}()
		return heartBeatStream, workStream
	}

	done := make(chan interface{})
	heartBeat, results := doWork(done)

	for {
		select {
		case _, ok := <-heartBeat:
			if ok {
				fmt.Println("pulse")
			} else {
				return
			}
		case r, ok := <-results:
			if ok {
				fmt.Printf("results %v\n", r)
			} else {
				return
			}
		}
	}
}
