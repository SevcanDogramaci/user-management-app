package service

import (
	"errors"

	"gitlab.com/sevcan.dog/FillLabsInterviewTask/internal/model"
	"gitlab.com/sevcan.dog/FillLabsInterviewTask/internal/repository"
)

func GetUser(userID string) (model.User, error) {

	return repository.GetUser(userID)
}

func CreateUser(user model.User) error {

	// check if a user with the same user id exists 
	userFromDB, _ := repository.GetUser(user.UserID)

	if (userFromDB != model.User{}) {
		return errors.New("user with the same id exist")
	} 
	return repository.CreateUser(user)
}

func UpdateUser(userID string, user model.User) error {

	// check if a user with the same user id exists 
	userFromDB, _ := repository.GetUser(user.UserID)

	if (userFromDB != model.User{} && userFromDB.UserID == user.UserID) {
		return errors.New("user with the same id exist")
	}
	return repository.UpdateUser(userID, user)
}

func DeleteUser(userID string) error {

	return repository.DeleteUser(userID)
}

func GetAllUsers() ([] model.User, error) {

	return repository.GetAllUsers()
}

