package main

import (
	"github.com/kislball/blin/api"
	"github.com/kislball/blin/app"
	"github.com/kislball/blin/model"
	"go.uber.org/fx"
	"log"
)

func main() {
	cfg, err := app.Load("./config.json")
	if err != nil {
		log.Fatal(err)
	}

	fx.New(
		model.ModelsModule(),
		app.NewModule(cfg),
		api.ApiModule(),
	).Run()
}
