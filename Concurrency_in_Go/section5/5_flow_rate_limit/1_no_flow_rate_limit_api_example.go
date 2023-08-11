package main

import (
	"context"
	"log"
	"os"
	"sync"
)

type APIConnection struct{}

// Open is
func Open() *APIConnection {
	return &APIConnection{}
}

// ReadFile is
func (a *APIConnection) ReadFile(ctx context.Context) error {
	// some executions
	return nil
}

// ResolveAddress is
func (a *APIConnection) ResolveAddress(ctx context.Context) error {
	// some executions
	return nil
}

func main() {
	defer log.Println("Done.")
	log.SetOutput(os.Stdout)
	log.SetFlags(log.Ltime | log.LUTC)

	apiConn := Open()
	var wg sync.WaitGroup
	wg.Add(20)

	for i := 0; i < 10; i++ {
		go func() {
			defer wg.Done()
			err := apiConn.ReadFile(context.Background())
			if err != nil {
				log.Printf("cannnot ReadFile: %v", err)
			}
			log.Printf("ReadFile")
		}()
	}
	for i := 0; i < 10; i++ {
		go func() {
			defer wg.Done()
			err := apiConn.ResolveAddress(context.Background())
			if err != nil {
				log.Printf("cannnot ResolveAddress: %v", err)
			}
			log.Printf("ResolveAddress")
		}()
	}

	wg.Wait()
}
