package model

import "gorm.io/gorm"

type Post struct {
	gorm.Model
	UserID uint
}
