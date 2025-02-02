import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "@config/environment.types";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (
        configService: ConfigService<EnvironmentVariables, true>,
      ) => {
        const config = configService.get("database", { infer: true });
        return {
          type: "postgres",
          ...config,
          autoLoadEntities: true,
          //NOTE: в продуктовой среде рекомендуется использовать миграции, для простоты оставляю
          //включенным synchronize
          // synchronize: configService.get("nodeEnv") !== "production",
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
