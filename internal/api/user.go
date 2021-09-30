package api

import (
	"github.com/gin-gonic/gin"

	"gitlab.com/sevcan.dog/FillLabsInterviewTask/internal/dto"
	"gitlab.com/sevcan.dog/FillLabsInterviewTask/internal/mapper"
	"gitlab.com/sevcan.dog/FillLabsInterviewTask/internal/service"
)

func GetUser(context *gin.Context) {

	userID := context.Param("id")
	user, err := service.GetUser(userID)

	if err != nil { 
		context.JSON(400, gin.H{ "error": err.Error() })
	} else {
		userDTO := mapper.MapUserToUserDTO(user)
		context.JSON(200, userDTO)
	}
}

func CreateUser(context *gin.Context) {

	var userDTO dto.UserDTO

	if err := context.BindJSON(&userDTO); err != nil {
		context.JSON(400, gin.H{ "error": "invalid input" })
	} else {
		user := mapper.MapUserDTOToUser(userDTO)
		err := service.CreateUser(user)

		if err != nil { 
			context.JSON(400, gin.H{ "error": err.Error() })
		} else {
			context.JSON(204, nil)
		}
	}
}

func UpdateUser(context *gin.Context) {
	userID := context.Param("id")
	var userDTO dto.UserDTO

	if err := context.BindJSON(&userDTO); err != nil {
		context.JSON(400, gin.H{ "error": "invalid input" })
		return
	}

	user := mapper.MapUserDTOToUser(userDTO)
	err := service.UpdateUser(userID, user)	

	if err != nil { 
		context.JSON(400, gin.H{ "error": err.Error() })
	} else {
		context.JSON(200, userDTO)
	}
}

func DeleteUser(context *gin.Context) {
	userID := context.Param("id")
	err := service.DeleteUser(userID)
	
	if err != nil { 
		context.JSON(400, gin.H{ "error": err.Error() })
	} else {
		context.JSON(204, nil)
	}
}