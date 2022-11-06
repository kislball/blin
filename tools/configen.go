package main

import (
	"encoding/json"
	"github.com/AlecAivazis/survey/v2"
	"github.com/kislball/blin/app"
	"os"
)

var qs = []*survey.Question{
	{
		Name: "address",
		Prompt: &survey.Input{
			Message: "Enter address to listen on",
		},
		Validate: survey.Required,
	},
	{
		Name: "environment",
		Prompt: &survey.Select{
			Message: "Select environment",
			Options: []string{"Development", "Production"},
			Default: "Development",
		},
	},
	{
		Name: "dsn",
		Prompt: &survey.Input{
			Message: "Enter DSN to access Postgres database",
		},
		Validate: survey.Required,
	},
}

func main() {
	answers := struct {
		Address     string
		Environment string
		DSN         string
	}{}

	err := survey.Ask(qs, &answers)
	if err != nil {
		panic(err)
	}

	cfg := &app.Config{}
	cfg.Address = answers.Address
	cfg.DSN = answers.DSN
	if answers.Environment == "Development" {
		cfg.Environment = app.EnvironmentDevelopment
	} else {
		cfg.Environment = app.EnvironmentProduction
	}

	res, err := json.MarshalIndent(cfg, "", "\t")
	if err != nil {
		panic(err)
	}

	file, err := os.Create("./config.json")
	if err != nil {
		panic(err)
	}

	_, err = file.Write(res)
	if err != nil {
		panic(err)
	}
}
