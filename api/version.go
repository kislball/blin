package api

import (
	"github.com/gofiber/fiber/v2"
	"github.com/kislball/blin/app"
	"go.uber.org/fx"
)

func VersionModule() fx.Option {
	return fx.Module(
		"version",
		fx.Invoke(func(fiberApp *fiber.App, cfg *app.Config) {
			fiberApp.Get("/version", func(ctx *fiber.Ctx) error {
				if cfg.Environment == app.EnvironmentDevelopment {
					return ctx.JSON(map[string]string{
						"version": app.Version,
					})
				} else {
					return ctx.SendStatus(fiber.StatusForbidden)
				}
			})
		}),
	)
}
