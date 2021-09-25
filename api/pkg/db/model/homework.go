package model

import "time"

type Homework struct {
	ID      int `gorm:"primary_key"`
	Homework homework `gorm:"embedded;embeddedPrefix:homework_"`
}

type homework struct{
	Id string
	Subject string
	Date time.Time
}