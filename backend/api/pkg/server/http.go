package server

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/kajikaji0725/ToDo-App/api/pkg/db"
	"github.com/kajikaji0725/ToDo-App/api/pkg/db/model"
)

type ApiClient struct {
	db *db.Controller
}

func NewApiClient(config *db.Config) (*ApiClient, error) {
	controller, err := db.NewController(config)
	if err != nil {
		return nil, err
	}
	return &ApiClient{controller}, nil
}

func (api *ApiClient) fetchAllHomework(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")
	log.Println("hogehogehoge")
	homework, err := api.db.FetchDBHomework()
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(&homework)
}

func (api *ApiClient) fetchSinglehHomework(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	w.Header().Set("Content-type", "application/json")
	homework, err := api.db.FetchDBSingleHomework(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(homework)
}

func (api *ApiClient) setHomework(w http.ResponseWriter, r *http.Request) {
	resp, _ := ioutil.ReadAll(r.Body)
	var homework model.ToDo
	if err := json.Unmarshal(resp, &homework); err != nil {
		http.Error(w, "json parsing error", http.StatusBadRequest)
		return
	}
	err := api.db.SetDBHomework(&homework)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(&homework)
}

func (api *ApiClient) deleteHomework(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	err := api.db.DeleteDBHomework(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Fprintf(w, "Id number %s has been deleted", id)
}

func (api *ApiClient) updateHomework(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	resp, _ := ioutil.ReadAll(r.Body)
	var homework model.ToDo
	if err := json.Unmarshal(resp, &homework); err != nil {
		http.Error(w, "json parsing error", 400)
		return
	}
	homework.Date.Local()
	err := api.db.UpdateDBHomework(&homework, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Fprintf(w, "Id number %s has been updated", id)
}

func (api *ApiClient) NewRouter() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/todo/{id}", api.fetchSinglehHomework).Methods("GET")
	router.HandleFunc("/todo", api.fetchAllHomework).Methods("GET")
	router.HandleFunc("/todo", api.setHomework).Methods("POST").Headers("Content-Type", "application/json")
	router.HandleFunc("/todo/{id}", api.deleteHomework).Methods("DELETE")
	router.HandleFunc("/todo/{id}", api.updateHomework).Methods("PUT").Headers("Content-Type", "application/json")
	return router
}
