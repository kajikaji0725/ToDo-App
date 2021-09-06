package pkg

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func rootPage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcom to the Go Api Server")
	fmt.Println("Root endpoint is hooked!")
}

func StartServer() error {
	router := mux.NewRouter()
	router.HandleFunc("/", rootPage)

	return http.ListenAndServe(fmt.Sprintf(":%d", 8080), router)
}
