package pkg

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

type Homework struct {
	Id      string    `json:"id"`
	Subject string    `json:"subject"`
	Date    time.Time `json:"date"`
}

var homeworks []Homework

func fetchAllHomework(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(homeworks)
}

func fetchSinglehHomework(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	w.Header().Set("Content-type", "application/json")

	for _, homework := range homeworks {
		if homework.Id == id {
			json.NewEncoder(w).Encode(homework)
			return
		}
	}
	http.Error(w, "Not Found\nMaybe you input the wrong key.", http.StatusBadRequest)
}

func setHomework(w http.ResponseWriter, r *http.Request) {
	resp, _ := ioutil.ReadAll(r.Body)
	log.Println(string(resp))
	var homework Homework
	if err := json.Unmarshal(resp, &homework); err != nil {
		http.Error(w, "json parsing error", http.StatusBadRequest)
		return
	}
	fmt.Println(homework)
	homeworks = append(homeworks, homework)
	json.NewEncoder(w).Encode(homeworks)
}

func deleteHomework(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	for i, homework := range homeworks {
		if homework.Id == id {
			homeworks = append(homeworks[:i], homeworks[i+1:]...)
			fmt.Fprintf(w, "Id number %s has been deleted", id)
			return
		}
	}
	http.Error(w, "Not Found\nMaybe you input the wrong key.", http.StatusBadRequest)
}

func updateHomework(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	resp, _ := ioutil.ReadAll(r.Body)
	var updatehomework Homework
	if err := json.Unmarshal(resp, &updatehomework); err != nil {
		http.Error(w, "json parsing error", 400)
		return
	}

	for i, homework := range homeworks {
		if homework.Id == id {
			homeworks[i] = Homework{
				Id:      homework.Id,
				Subject: updatehomework.Subject,
				Date:    updatehomework.Date,
			}
			fmt.Fprintf(w, "Id number %s has been updated", id)
			return
		}
	}
	http.Error(w, "Not Found\nMaybe you input the wrong key.", http.StatusBadRequest)
}

func NewRouter() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/todo/{id}", fetchSinglehHomework).Methods("GET")
	router.HandleFunc("/todo", fetchAllHomework).Methods("GET")
	router.HandleFunc("/todo", setHomework).Methods("POST")
	router.HandleFunc("/todo/{id}", deleteHomework).Methods("DELETE")
	router.HandleFunc("/todo/{id}", updateHomework).Methods("PUT")
	return router
}
