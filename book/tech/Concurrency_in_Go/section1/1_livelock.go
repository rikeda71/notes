package main

import (
	"bytes"
	"fmt"
	"sync"
	"sync/atomic"
	"time"
)

func main() {
	cadence := sync.NewCond(&sync.Mutex{})
	go func() {
		for range time.Tick(1 * time.Millisecond) {
			cadence.Broadcast()
		}
	}()

	// 人言は同じ歩調で歩くということをシミュレート（）
	takeStep := func() {
		cadence.L.Lock()
		cadence.Wait()
		cadence.L.Unlock()
	}

	// ある人がある方向に動いてみて、うまく動けたかを返却
	// 各方向は、その方向dirに歩こうとしている人数で表示
	tryDir := func(dirName string, dir *int32, out *bytes.Buffer) bool {
		fmt.Fprintf(out, " %v", dirName)
		atomic.AddInt32(dir, 1)
		takeStep()
		if atomic.LoadInt32(dir) == 1 {
			fmt.Fprintf(out, ". Success!")
			return true
		}
		takeStep()
		atomic.AddInt32(dir, -1)
		return false
	}
	var left, right int32
	tryLeft := func(out *bytes.Buffer) bool {
		return tryDir("left", &left, out)
	}
	tryRight := func(out *bytes.Buffer) bool {
		return tryDir("right", &right, out)
	}
	out := bytes.NewBuffer([]byte{'a'})
	fmt.Println(tryLeft(out), tryRight(out))

	walk := func(walking *sync.WaitGroup, name string) {
		var out bytes.Buffer
		defer func() { fmt.Println(out.String()) }()
		defer walking.Done()
		fmt.Fprintf(&out, "%v is trying to scoot:", name)
		for i := 0; i < 5; i++ {
			if tryLeft(&out) || tryRight(&out) {
				return
			}
			fmt.Fprintf(&out, "\n%v tosses her hands up in exasperation!", name)
		}
	}

	var peopleInHallway sync.WaitGroup
	peopleInHallway.Add(2)
	go walk(&peopleInHallway, "Alice")
	go walk(&peopleInHallway, "Barbara")
	peopleInHallway.Wait()
}
