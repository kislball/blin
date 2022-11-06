package app

import (
	"go.uber.org/fx"
	"go.uber.org/zap"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Models []interface{}

func DatabaseModule() fx.Option {
	return fx.Module(
		"database",
		fx.Provide(func(cfg *Config) (*gorm.DB, error) {
			return gorm.Open(postgres.Open(cfg.DSN), &gorm.Config{})
		}),
		fx.Invoke(func(models Models, db *gorm.DB, z *zap.Logger) error {
			err := db.AutoMigrate(models...)

			if err != nil {
				z.Info("migrated models", zap.Int("total", len(models)))
			}

			return err
		}),
	)
}
