package main

import (
	"log"
	"net/http"

	"github.com/kajikaji0725/ToDo-App/api/pkg/db"
	"github.com/kajikaji0725/ToDo-App/api/pkg/server"
	"github.com/rs/cors"
)

func main() {
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowCredentials: true,
	})
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
	handler := c.Handler(router)
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatal(err)
	}
}
