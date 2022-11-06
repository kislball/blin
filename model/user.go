package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username     string
	PasswordHash string
	RecoveryHash string
	Bio          string
	Posts        []Post
}
