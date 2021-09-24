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

func fetchAllHomework(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")
	fetchHomework, err := db.DBContoroller(model.ToDo{}, "", http.MethodGet)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(fetchHomework)
}

// func fetchSinglehHomework(w http.ResponseWriter, r *http.Request) {　//保留
// 	vars := mux.Vars(r)
// 	id := vars["id"]
// 	w.Header().Set("Content-type", "application/json")

// 	// for _, homework := range homeworks {
// 	// 	if homework.Id == id {
// 	// 		json.NewEncoder(w).Encode(homework)
// 	// 		return
// 	// 	}
// 	// }
// 	http.Error(w, "Not Found\nMaybe you input the wrong key.", http.StatusBadRequest)
// }

func setHomework(w http.ResponseWriter, r *http.Request) {
	resp, _ := ioutil.ReadAll(r.Body)
	var homework model.ToDo
	if err := json.Unmarshal(resp, &homework); err != nil {
		http.Error(w, "json parsing error", http.StatusBadRequest)
		return
	}
	_, err := db.DBContoroller(homework, "", http.MethodPost)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(homework)
}

func deleteHomework(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var homework model.ToDo
	_, err := db.DBContoroller(homework, id, http.MethodDelete)
	if err != nil {
		http.Error(w, "Worning!!\nThis Id number couldn't be deleted\nThere is a possibility that the id you entered is wrong.\nPlease check the id ", http.StatusInternalServerError)
		return
	}
	fmt.Fprintf(w, "Id number %s has been deleted", id)
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
	_, err := db.DBContoroller(updatedhomework, id, http.MethodPut)
	if err != nil {
		http.Error(w, "Worning!!\nThis Id number couldn't be updated\nThere is a possibility that the id you entered is wrong.\nPlease check the id ", http.StatusInternalServerError)
		return
	}
	fmt.Fprintf(w, "Id number %s has been updated", id)
}

func NewRouter() (*mux.Router, error) {
	router := mux.NewRouter()
	// router.HandleFunc("/todo/{id}", fetchSinglehHomework).Methods("GET") 1つだけ取得したい時ってあるのかな？
	router.HandleFunc("/todo", fetchAllHomework).Methods("GET")
	router.HandleFunc("/todo", setHomework).Methods("POST")
	router.HandleFunc("/todo/{id}", deleteHomework).Methods("DELETE")
	router.HandleFunc("/todo/{id}", updateHomework).Methods("PUT")
	return router, nil
}
