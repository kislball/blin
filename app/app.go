package app

import (
	"go.uber.org/fx"
	"go.uber.org/fx/fxevent"
	"go.uber.org/zap"
)

// Version is a version of the app.
const Version = "v0.1.0"

// NewModule creates a new root Fx module with given config.
func NewModule(cfg *Config) fx.Option {
	return fx.Module(
		"app",
		fx.Provide(func() *Config {
			return cfg
		}),
		FiberModule(),
		ZapModule(),
		DatabaseModule(),
	)
}

// UseLogger sets up a logger for the app.
func UseLogger() fx.Option {
	return fx.WithLogger(func(log *zap.Logger) fxevent.Logger {
		logger := &fxevent.ZapLogger{Logger: log}

		log.Info(
			"starting blin",
			zap.String("version", Version),
		)

		return logger
	})
}
