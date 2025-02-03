import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import compression from "compression";
import "dotenv/config";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "@config/environment.types";
import { HttpExceptionFilter } from "@common/filters/http-exception.filter";
import { ApolloExceptionFilter } from "@common/filters/apollo-exception.filter";

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(compression());
  app.useGlobalFilters(new ApolloExceptionFilter(), new HttpExceptionFilter());
  app.enableCors({
    origin: [
      "http://localhost:5000",
      "http://localhost:3000",
      "https://figovina.com",
      "https://api.figovina.com",
    ],
    credentials: true,
  });
  app.useBodyParser("json", { limit: "50mb" });

  const configService = app.get(ConfigService<EnvironmentVariables, true>);
  const port = configService.get("port", { infer: true });

  await app.listen(port, () =>
    logger.log(
      "- server port. Started: " + new Date().toLocaleString("ru"),
      port,
    ),
  );
}

bootstrap();
