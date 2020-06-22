package main

import (
	"os"

	"github.com/fabianotessarolo/gremling-hpa-demo/src/bff/app"
)

func main() {
	a := app.App{}
	a.Initialize(
		os.Getenv("RABBIT_USER"),
		os.Getenv("RABBIT_PASSWORD"),
		os.Getenv("RABBIT_HOST"),
		os.Getenv("RABBIT_PORT"))
	a.Run(":8080")
}
