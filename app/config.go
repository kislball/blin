package app

import (
	"encoding/json"
	"io"
	"os"
)

type Environment int

func (e Environment) String() string {
	if e == EnvironmentDevelopment {
		return "development"
	} else if e == EnvironmentProduction {
		return "production"
	} else {
		return "unknown"
	}
}

const (
	EnvironmentDevelopment Environment = iota
	EnvironmentProduction
)

// Config is a configuration for the app.
type Config struct {
	// Address is a host:port to listen on.
	Address string
	// Environment is an environment to run the app in.
	Environment Environment
	// DSN is database configuration.
	DSN string
}

// Load loads config from path.
func Load(path string) (*Config, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}

	data, err := io.ReadAll(file)
	if err != nil {
		return nil, err
	}

	var cfg Config
	err = json.Unmarshal(data, &cfg)

	return &cfg, err
}
