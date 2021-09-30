package model

import(
	"time"
)

type User struct {
	ID uint           `gorm:"primaryKey;autoIncrement"`
	UserID string	  `gorm:"not null;unique;size:5;check:user_id <> ''"` // unique id defined by user
	Name string 	  `gorm:"not null"`
	Surname string 	  `gorm:"not null"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
