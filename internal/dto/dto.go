package dto

type UserDTO struct {
	UserID string `json:"id" binding:"required,len=5"`
	Name string  `json:"name" binding:"required"`
	Surname string `json:"surname" binding:"required"`
}
