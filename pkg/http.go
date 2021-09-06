package pkg

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
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
}

func getAllHomework(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(persons)
}

func getSingleFetchHomework(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	key := vars["key"]
	w.Header().Set("Content-type", "application/json")

	for _, person := range persons {
		if strings.Contains(person.Id, key) {
			json.NewEncoder(w).Encode(person)
		}
	}
	fmt.Fprintln(w, "Not Found\nMaybe you input the wrong key.")
}

func setHomework(w http.ResponseWriter, r *http.Request) {
	resp, _ := ioutil.ReadAll(r.Body)
	var person Homework
	if err := json.Unmarshal(resp, &person); err != nil {
		http.Error(w, "json parsing error", 400)
		return
	}
	persons = append(persons, &person)
	json.NewEncoder(w).Encode(person)
}

func StartServer() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/", rootPage)
	router.HandleFunc("/homework/{key}", getSingleFetchHomework).Methods("GET")
	router.HandleFunc("/homework", getAllHomework).Methods("GET")
	router.HandleFunc("/homework", setHomework).Methods("POST")
	return router
}
