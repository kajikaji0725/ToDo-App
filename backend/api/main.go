package main

import (
	"log"

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

	apiClient, err := server.NewController(&config)

	if err != nil {
		log.Fatal(err)
	}

	router := apiClient.NewRouter()

	if err := router.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
