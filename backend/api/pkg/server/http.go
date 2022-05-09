package server

import (
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/kajikaji0725/ToDo-App/api/pkg/db"
	"github.com/kajikaji0725/ToDo-App/api/pkg/db/model"
)

type ApiClient struct {
	db *db.Controller
}

func (api *ApiClient) fetchAllHomework(c *gin.Context) {
	homework, _ := api.db.FetchDBHomework()

	for _, homeworkDetail := range homework {
		c.JSON(http.StatusOK, gin.H{
			"id":      homeworkDetail.Homework.Id,
			"subject": homeworkDetail.Homework.Subject,
			"date":    homeworkDetail.Homework.Date,
		})
	}
}

func (api *ApiClient) fetchSinglehHomework(c *gin.Context) {
	id := c.Param("id")
	homework, err := api.db.FetchDBSingleHomework(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "invalid_id"})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":      homework.Homework.Id,
		"subject": homework.Homework.Subject,
		"date":    homework.Homework.Date,
	})
}

func (api *ApiClient) setHomework(c *gin.Context) {
	var homework model.ToDo
	err := c.ShouldBindJSON(&homework)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "JsonParse_error"})
		return
	}

	err = api.db.SetDBHomework(&homework)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "error of setting db"})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":      homework.Id,
		"subject": homework.Subject,
		"date":    homework.Date,
	})
}

func (api *ApiClient) deleteHomework(c *gin.Context) {
	id := c.Param("id")
	err := api.db.DeleteDBHomework(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "error of delet db"})
		c.Abort()
		return
	}

	c.String(http.StatusOK, "Id number %s has been deleted", id)
}

func NewController(config *db.Config) (*ApiClient, error) {
	controller, err := db.NewController(config)
	if err != nil {
		return nil, err
	}
	return &ApiClient{controller}, nil
}

func (api *ApiClient) NewRouter() *gin.Engine {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:8080",
			"http://localhost:8081",
		},
		AllowMethods: []string{
			"GET",
			"POST",
			"DELETE",
			"PUT",
			"HEAD",
		},
		AllowHeaders: []string{
			"Content-Type",
		},
		AllowCredentials: false,

		MaxAge: 24 * time.Hour,
	}))

	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "welcom to my To-Do App!!!")
	})
	router.GET("/todo", api.fetchAllHomework)
	router.GET("/todo/:id", api.fetchSinglehHomework)
	router.POST("/todo", api.setHomework)
	router.DELETE("/todo/:id", api.deleteHomework)

	return router
}
