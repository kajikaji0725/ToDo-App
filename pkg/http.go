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

var homeworks []*Homework

func init() {
	homeworks = []*Homework{
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

func fetchAllHomework(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(homeworks)
}

func fetchSinglehHomework(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	w.Header().Set("Content-type", "application/json")

	for _, homework := range homeworks {
		if strings.Contains(homework.Id, id) {
			json.NewEncoder(w).Encode(homework)
			return
		}
	}
	fmt.Fprintln(w, "Not Found\nMaybe you input the wrong key.")
}

func setHomework(w http.ResponseWriter, r *http.Request) {
	resp, _ := ioutil.ReadAll(r.Body)
	log.Println(string(resp))
	var setHomework Homework
	if err := json.Unmarshal(resp, &setHomework); err != nil {
		http.Error(w, "json parsing error", 400)
		return
	}
	fmt.Println(setHomework)
	homeworks = append(homeworks, &setHomework)
	json.NewEncoder(w).Encode(homeworks)
}

func deleteHomework(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	for i, homework := range homeworks {
		if strings.Contains(homework.Id, id) {
			homeworks = append(homeworks[:i], homeworks[i+1:]...)
			fmt.Fprintf(w, "Id number %s has been deleted", id)
			return
		}
	}
}

func updateHomework(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	resp, _ := ioutil.ReadAll(r.Body)
	var updateHomework Homework
	if err := json.Unmarshal(resp, &updateHomework); err != nil {
		http.Error(w, "json parsing error", 400)
		return
	}

	for i, homework := range homeworks {
		if strings.Contains(homework.Id, id) {
			homeworks[i] = &Homework{
				Id:      homework.Id,
				Subject: updateHomework.Subject,
				Date:    updateHomework.Date,
			}
			fmt.Fprintf(w, "Id number %s has been updated", id)
			return
		}
	}
}

func StartServer() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/", rootPage)
	router.HandleFunc("/homework/{id}", fetchSinglehHomework).Methods("GET")
	router.HandleFunc("/homework", fetchAllHomework).Methods("GET")
	router.HandleFunc("/homework", setHomework).Methods("POST")
	router.HandleFunc("/homework/{id}", deleteHomework).Methods("DELETE")
	router.HandleFunc("/homework/{id}", updateHomework).Methods("PUT")
	return router
}
