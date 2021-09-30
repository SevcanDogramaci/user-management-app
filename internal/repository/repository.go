package repository

import (
	"log"
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"gitlab.com/sevcan.dog/FillLabsInterviewTask/internal/model"
	"gitlab.com/sevcan.dog/FillLabsInterviewTask/internal/config"
)

var commonDB *gorm.DB

func Init(){

	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", 
						   config.DB_USER, config.DB_PASSWORD, config.DB_NAME)
	db, err := gorm.Open(postgres.Open(dbinfo), &gorm.Config{})
	commonDB = db
	if err != nil {
		log.Fatal(err, db)
	}
	commonDB.AutoMigrate(&model.User{})
}

func CreateUser(user model.User) error {

	if commonDB == nil { Init() }

	transactionResult := commonDB.Create(&user)
	if err := transactionResult.Error; err != nil {
		return err
	}
	return nil
}

func UpdateUser(userID string, user model.User) error {

	if commonDB == nil { Init() }

	var userFromDB model.User
	commonDB.Where("user_id = ?", userID).First(&userFromDB)

	userFromDB.UserID = user.UserID
	userFromDB.Name = user.Name
	userFromDB.Surname = user.Surname

	transactionResult := commonDB.Save(&userFromDB)
	if err := transactionResult.Error; err != nil {
		return err
	}
	return nil
}

func DeleteUser(userID string) error {

	if commonDB == nil { Init() }

	var userFromDB model.User
	transactionResult := commonDB.Where("user_id = ?", userID).First(&userFromDB)
	err := transactionResult.Error

	if err == nil {
		transactionResult = commonDB.Delete(userFromDB)
		if err = transactionResult.Error; err != nil {
			return err
		}
		return nil
	}
	return err
}

func GetUser(userID string) (model.User, error) {

	if commonDB == nil { Init() }

	var userFromDB model.User
	transactionResult := commonDB.Where("user_id = ?", userID).First(&userFromDB)
	
	if err := transactionResult.Error; err != nil {
		return userFromDB, err
	}
	return userFromDB, nil
}

func GetAllUsers() ([]model.User, error ){

	if commonDB == nil { Init() }

	var usersFromDB []model.User
	transactionResult := commonDB.Order("user_id").Find(&usersFromDB)

	if err := transactionResult.Error; err != nil {
		return usersFromDB, err
	}
	return usersFromDB, nil
}