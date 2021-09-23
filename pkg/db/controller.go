package db

import (
	"fmt"

	"github.com/kajikaji0725/ToDo-App/pkg/db/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Contoroller struct {
	contoroller *gorm.DB
}

type Config struct {
	Host     string
	Username string
	Password string
	DBname   string
	Port     string
}

func Dsn(config Config) string {
	return fmt.Sprintf(
		"user=%s password=%s port=%s database=%s host=%s sslmode=disable",
		config.Username,
		config.Password,
		config.Port,
		config.DBname,
		config.Host,
	)
}

func NewContoroller() (*Contoroller, error) {
	config := Config{
		Host:     "homework-db",
		Username: "root",
		Password: "root",
		DBname:   "root",
		Port:     "5432",
	}

	db, err := gorm.Open(postgres.Open(Dsn(config)), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	err = db.AutoMigrate(
		&model.Homework{},
	)
	if err != nil {
		return nil, err
	}
	return &Contoroller{db}, nil
}

func DBContoroller(toDo model.ToDo, methods string) error {
	db, err := NewContoroller()
	if err != nil {
		return err
	}
	switch methods {
	case "POST":
		db.SetDBHomework(toDo)
	}

	return nil
}

func (contoroller *Contoroller) SetDBHomework(toDo model.ToDo) error {
	homework := model.Homework{}
	homework.ID = 1
	homework.Homework.Id = toDo.Id
	homework.Homework.Subject = toDo.Subject
	homework.Homework.Date = toDo.Date
	contoroller.contoroller.Create(&homework)
	return nil
}
