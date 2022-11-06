package model

import (
	"github.com/kislball/blin/app"
	"go.uber.org/fx"
)

var Models = app.Models{
	&User{},
	&Post{},
}

func ModelsModule() fx.Option {
	return fx.Module(
		"models",
		fx.Provide(func() app.Models {
			return Models
		}),
	)
}
