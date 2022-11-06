package app

import (
	"go.uber.org/fx"
	"go.uber.org/zap"
)

func ZapModule() fx.Option {
	return fx.Module(
		"zap",
		fx.Provide(func(cfg *Config) (*zap.Logger, error) {
			if cfg.Environment == EnvironmentDevelopment {
				return zap.NewDevelopment()
			} else {
				return zap.NewProduction()
			}
		}),
	)
}
