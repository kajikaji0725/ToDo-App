package model

import "time"

type ToDo struct {
	Id      string    `json:"id"`
	Subject string    `json:"subject"`
	Date    time.Time `json:"date" time_format:"2006-01-02 15:04:05"`
}
