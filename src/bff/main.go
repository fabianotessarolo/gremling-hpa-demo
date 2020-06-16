package main

import "os"

func main() {
	a := App{}
	a.Initialize(
		os.Getenv("RABBIT_USER"),
		os.Getenv("RABBIT_PASSWORD"),
		os.Getenv("RABBIT_HOST"),
		os.Getenv("RABBIT_PORT"))
	a.Run(":8080")
}
