package app

import (
	"context"
	"github.com/gofiber/fiber/v2"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

func errorHandler(ctx *fiber.Ctx, err error) error {
	code := fiber.StatusInternalServerError

	if e, ok := err.(*fiber.Error); ok {
		code = e.Code
	}

	ctx.Append("X-Has-Error", "true")

	return ctx.Status(code).JSON(fiber.Map{
		"code":    code,
		"message": err.Error(),
	})
}

// FiberModule creates a new Fx module for FiberModule.
func FiberModule() fx.Option {
	return fx.Module(
		"fiber",
		fx.Provide(func(lc fx.Lifecycle, cfg *Config, z *zap.Logger) *fiber.App {
			fiberApp := fiber.New(
				fiber.Config{
					DisableStartupMessage: true,
					AppName:               "blin",
					ErrorHandler:          errorHandler,
				},
			)

			lc.Append(fx.Hook{
				OnStart: func(ctx context.Context) error {
					go fiberApp.Listen(cfg.Address)
					z.Info("webserver started", zap.String("address", cfg.Address))
					return nil
				},
			})

			return fiberApp
		}),
		fx.Invoke(func(app *fiber.App) {}),
	)
}
