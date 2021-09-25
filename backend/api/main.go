package main

import (
	"log"
	"net/http"

	"github.com/kajikaji0725/ToDo-App/api/pkg/db"
	"github.com/kajikaji0725/ToDo-App/api/pkg/server"
)

func main() {
	config := db.Config{
		Host:     "homework-db",
		Username: "root",
		Password: "root",
		DBname:   "root",
		Port:     "5432",
	}
	apiClient ,err := server.NewApiClient(&config)
	router := apiClient.NewRouter()
	if err != nil {
		log.Fatal(err)
	}
	if err := http.ListenAndServe(":8080", router); err != nil {
		log.Fatal(err)
	}
}
