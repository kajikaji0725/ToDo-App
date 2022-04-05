package model

import "time"

type ToDo struct {
	ID string    `json:"id"`
	Subject    string    `json:"subject"`
	Date       time.Time `json:"date"`
}
