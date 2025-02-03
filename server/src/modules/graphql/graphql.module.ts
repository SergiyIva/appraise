import { join } from "path";
import depthLimit from "graphql-depth-limit";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule as ApolloModule } from "@nestjs/graphql";
import { Request, Response } from "express";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "@config/environment.types";
import { UserModule } from "@modules/user/user.module";

@Module({
  imports: [
    ApolloModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: (
        configService: ConfigService<EnvironmentVariables, true>,
      ) => ({
        sortSchema: true,
        autoSchemaFile: join(process.cwd(), "schema.gql"),
        definitions: {
          path: join(process.cwd(), "graphql.ts"),
          emitTypenameField: true,
          enumsAsTypes: true,
        },
        playground: false,
        introspection: configService.get("nodeEnv") !== "production",
        plugins:
          configService.get("nodeEnv") !== "production"
            ? [ApolloServerPluginLandingPageLocalDefault()]
            : [],
        path: "/graphql",
        validationRules: [depthLimit(10)],
        context: ({ req, res }: { req: Request; res: Response }) => ({
          req,
          res,
        }),
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
})
export class GraphQLModule {}
