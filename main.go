package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/kajikaji0725/ToDo-App/pkg"
)

func main() {
	if err := http.ListenAndServe(fmt.Sprintf(":%d", 8080), pkg.NewRouter()); err != nil {
		log.Fatal(err)
	}
}
