package api

import (
	"github.com/gin-gonic/gin"
	
	"gitlab.com/sevcan.dog/FillLabsInterviewTask/internal/mapper"
	"gitlab.com/sevcan.dog/FillLabsInterviewTask/internal/service"
)

func GetAllUsers(context *gin.Context) {

	users, err := service.GetAllUsers()

	if err != nil { 
		context.JSON(400, gin.H{ "error": err.Error() })
	} else {
		usersDTO := mapper.MapUsersToUsersDTO(users)
		context.JSON(200, usersDTO)
	}
}