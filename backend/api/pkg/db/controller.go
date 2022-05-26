package db

import (
	"errors"
	"fmt"

	"github.com/kajikaji0725/ToDo-App/api/pkg/db/model"
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

func Dsn(config *Config) string {
	return fmt.Sprintf(
		"user=%s password=%s port=%s database=%s host=%s sslmode=disable",
		config.Username,
		config.Password,
		config.Port,
		config.DBname,
		config.Host,
	)
}

func NewController(config *Config) (*Controller, error) {
	db, err := gorm.Open(postgres.Open(Dsn(config)), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	err = db.AutoMigrate(
		&model.ToDo{},
	)
	if err != nil {
		return nil, err
	}
	return &Controller{db}, nil
}

func (controller *Controller) FetchDBHomework() ([]model.ToDo, error) {
	homework := []model.ToDo{}
	err := controller.db.Find(&homework).Error
	if err != nil {
		return nil, err
	}
	return homework, nil
}

func (controller *Controller) FetchDBSingleHomework(id string) (*model.ToDo, error) {
	homework := model.ToDo{}
	err := controller.db.First(&homework, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return &homework, nil
}

func (controller *Controller) SetDBHomework(toDo *model.ToDo) error {
	homework := model.ToDo{}
	err := controller.db.Model(&homework).Create(map[string]interface{}{"id": toDo.Id, "subject": toDo.Subject, "date": toDo.Date}).Error
	if err != nil {
		return err
	}
	return nil
}

func (controller *Controller) DeleteDBHomework(id string) error {
	homework := model.ToDo{}
	err := controller.db.First(&homework, "id = ?", id).Delete(&homework)
	if err.RowsAffected == 0 {
		return errors.New("Warning!!\nThis Id number couldn't be deleted\nThere is a possibility that the id you entered is wrong.\nPlease check the id ")
	}
	return nil
}

func (controller *Controller) UpdateDBHomework(toDo *model.ToDo, id string) error {
	homework := model.ToDo{}
	err := controller.db.Model(&homework).Where("id = ?", id).Updates(map[string]interface{}{"id": toDo.Id, "subject": toDo.Subject, "date": toDo.Date})
	if err.RowsAffected == 0 {
		return errors.New("Warning!!\nThis Id number couldn't be updated\nThere is a possibility that the id you entered is wrong.\nPlease check the id ")
	}
	return nil
}
