package mapper

import (
	"gitlab.com/sevcan.dog/FillLabsInterviewTask/internal/dto"
	"gitlab.com/sevcan.dog/FillLabsInterviewTask/internal/model"
)

func MapUserToUserDTO(user model.User) dto.UserDTO {

	var userDTO dto.UserDTO = dto.UserDTO { 
		UserID: user.UserID,
		Name: user.Name,
		Surname: user.Surname,
	}
	return userDTO
}

func MapUserDTOToUser(userDTO dto.UserDTO) model.User {
	
	var user model.User = model.User{ 		
		UserID: userDTO.UserID,
		Name: userDTO.Name,
		Surname: userDTO.Surname,
	}
	return user
}

func MapUsersToUsersDTO(users [] model.User) [] dto.UserDTO{

	var usersDTO = []dto.UserDTO{}
	
	for i:= 0; i < len(users); i++ {
		user := users[i]
		usersDTO = append(usersDTO, MapUserToUserDTO(user))
	}
	return usersDTO
}