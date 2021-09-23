package main

import (
	"log"
	"net/http"

	"github.com/kajikaji0725/ToDo-App/pkg/server"
)

func main() {
	router, err := server.NewRouter()
	if err != nil {
		log.Fatal(err)
		return
	}
	if err := http.ListenAndServe(":8080", router); err != nil {
		log.Fatal(err)
	}
}
