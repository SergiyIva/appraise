import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import validationSchema from "@config/env-validation.schema";
import databaseConfig from "@config/database.config";
import commonConfig from "@config/common.config";
import { GraphQLModule } from "@modules/graphql/graphql.module";
import { DbModule } from "@modules/db/db.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validationSchema,
      load: [databaseConfig, commonConfig],
    }),
    DbModule,
    GraphQLModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
