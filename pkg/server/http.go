package server

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/kajikaji0725/ToDo-App/pkg/db"
	"github.com/kajikaji0725/ToDo-App/pkg/db/model"
)

var homeworks []model.ToDo

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
	var homework model.ToDo
	if err := json.Unmarshal(resp, &homework); err != nil {
		http.Error(w, "json parsing error", http.StatusBadRequest)
		return
	}
	err := db.DBContoroller(homework, http.MethodPost)
	if err != nil {
		http.Error(w, "worning", http.StatusBadRequest)
		return
	}
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
	var updatedhomework model.ToDo
	if err := json.Unmarshal(resp, &updatedhomework); err != nil {
		http.Error(w, "json parsing error", 400)
		return
	}

	for i, homework := range homeworks {
		if homework.Id == id {
			homeworks[i] = model.ToDo{
				Id:      homework.Id,
				Subject: updatedhomework.Subject,
				Date:    updatedhomework.Date,
			}
			fmt.Fprintf(w, "Id number %s has been updated", id)
			return
		}
	}
	http.Error(w, "Not Found\nMaybe you input the wrong key.", http.StatusBadRequest)
}

func NewRouter() (*mux.Router, error) {
	router := mux.NewRouter()
	router.HandleFunc("/todo/{id}", fetchSinglehHomework).Methods("GET")
	router.HandleFunc("/todo", fetchAllHomework).Methods("GET")
	router.HandleFunc("/todo", setHomework).Methods("POST")
	router.HandleFunc("/todo/{id}", deleteHomework).Methods("DELETE")
	router.HandleFunc("/todo/{id}", updateHomework).Methods("PUT")
	return router, nil
}
