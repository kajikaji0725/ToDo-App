package model

type Homework struct {
	ID       int  `gorm:"primary_key" json:"id"`
	Homework ToDo `gorm:"embedded;embeddedPrefix:homework_" json:"homework"`
}
