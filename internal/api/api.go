package api

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"gitlab.com/sevcan.dog/FillLabsInterviewTask/internal/config"
)

func createRouter() *gin.Engine {
	// create default gin router
	router := gin.Default()

	// enable CORS
	apiConfig := cors.DefaultConfig()
	apiConfig.AllowOrigins = []string{ config.ALLOWED_ORIGIN }
	router.Use(cors.New(apiConfig))

	return router
}

func setAPI() *gin.Engine {
	router := createRouter()

	// set endpoints
	router.GET("/users", GetAllUsers)
	router.GET("/user/:id", GetUser)
	router.POST("/user", CreateUser)
	router.PUT("/user/:id", UpdateUser)
	router.DELETE("/user/:id", DeleteUser)
	router.NoRoute(func(context *gin.Context) { 
		context.JSON(http.StatusNotFound, gin.H{}) 
	})

	return router
}

func InitAPI() {

	router := setAPI()
	router.Run(config.PORT)
}
