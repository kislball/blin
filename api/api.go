package api

import (
	"go.uber.org/fx"
)

func ApiModule() fx.Option {
	return fx.Module(
		"api",
		VersionModule(),
	)
}
