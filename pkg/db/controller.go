package db

import (
	"errors"
	"fmt"

	"github.com/kajikaji0725/ToDo-App/pkg/db/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Controller struct {
	db *gorm.DB
}

type Config struct {
	Host     string
	Username string
	Password string
	DBname   string
	Port     string
}

func dsn(config Config) string {
	return fmt.Sprintf(
		"user=%s password=%s port=%s database=%s host=%s sslmode=disable",
		config.Username,
		config.Password,
		config.Port,
		config.DBname,
		config.Host,
	)
}

func NewController() (*Controller, error) {
	config := Config{
		Host:     "homework-db",
		Username: "root",
		Password: "root",
		DBname:   "root",
		Port:     "5432",
	}

	db, err := gorm.Open(postgres.Open(dsn(config)), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	err = db.AutoMigrate(
		&model.Homework{},
	)
	if err != nil {
		return nil, err
	}
	return &Controller{db}, nil
}

func DBContoroller(toDo model.ToDo, id string, methods string) ([]model.Homework, error) { //戻り値の[]model.HomeworkはfetchAllHomeworkのためだけにあります。
	db, err := NewController()
	if err != nil {
		return nil, err
	}
	switch methods {
	case "GET":
		fetchHomework, err := db.FetchDBHomework()
		if err != nil {
			return nil, err
		}
		return fetchHomework, nil
	case "POST":
		err = db.SetDBHomework(toDo)
	case "DELETE":
		err = db.DeleteDBHomework(id)
	case "PUT":
		err = db.UpdateDBHomework(toDo, id)
	}
	if err != nil {
		return nil, err
	}
	return nil, nil
}

func (contoroller *Controller) SetDBHomework(toDo model.ToDo) error {
	homework := model.Homework{}
	err := contoroller.db.Model(&homework).Create(map[string]interface{}{"homework_id": toDo.Id, "homework_subject": toDo.Subject, "homework_date": toDo.Date}).Error
	if err != nil {
		return err
	}
	return nil
}

func (controller *Controller) DeleteDBHomework(id string) error {
	homework := model.Homework{}
	err := controller.db.First(&homework, "homework_id = ?", id).Delete(&homework)
	if err.RowsAffected == 0 {
		return errors.New("")
	}
	return nil
}

func (controller *Controller) UpdateDBHomework(toDo model.ToDo, id string) error {
	updatedHomework := model.Homework{}
	err := controller.db.Model(&updatedHomework).Where("homework_id = ?", id).Updates(map[string]interface{}{"homework_id": toDo.Id, "homework_subject": toDo.Subject, "homework_date": toDo.Date})
	if err.RowsAffected == 0 {
		return errors.New("")
	}
	return nil
}

func (controller *Controller) FetchDBHomework() ([]model.Homework, error) {
	fetchHomework := []model.Homework{}
	err := controller.db.Find(&fetchHomework).Error
	if err != nil {
		return nil, err
	}
	return fetchHomework, nil
}
