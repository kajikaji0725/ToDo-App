package pkg

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/gorilla/mux"
)

type Homework struct {
	Id      string    `json:"id"`
	Subject string    `json:"subject"`
	Date    time.Time `json:"date"`
}

var persons []*Homework

func init() {
	persons = []*Homework{
		&Homework{
			Id:      "1",
			Subject: "信号処理基礎",
			Date:    time.Now(),
		},
	}
}

func rootPage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcom to the Go Api Server")
	fmt.Println("Root endpoint is hooked!")
}

func getAllHomework(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(persons)
}

func getSingleHomework(w http.ResponseWriter, r *http.Request) {
	// vars := mux.Vars(r)
	// key := vars["id"]
	w.Header().Set("Content-type", "application/json")
	log.Println("草")

	for _, person := range persons {
		fmt.Println(person.Id)
		if strings.Contains(person.Id, "32") {
			json.NewEncoder(w).Encode(persons)
		}
	}
}

func setHomework(w http.ResponseWriter, r *http.Request) {
	resp, _ := ioutil.ReadAll(r.Body)
	var person Homework
	if err := json.Unmarshal(resp, &person); err != nil {
		log.Fatal(err)
	}

	persons = append(persons, &person)
	json.NewEncoder(w).Encode(person)
}

func StartServer() error {
	router := mux.NewRouter()
	router.HandleFunc("/", rootPage)
	router.HandleFunc("/getSingleHomework", getSingleHomework).Methods("GET")
	router.HandleFunc("/getAllHomework", getAllHomework).Methods("GET")
	router.HandleFunc("/setHomework", setHomework).Methods("POST")

	return http.ListenAndServe(fmt.Sprintf(":%d", 8080), router)
}
