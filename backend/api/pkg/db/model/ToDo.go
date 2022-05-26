package model

import "time"

type ToDo struct {
	Id      int       `json:"id" gorm:"primary_key"`
	Subject string    `json:"subject"`
	Date    time.Time `json:"date" time_format:"2006-01-02 15:04"`
}
