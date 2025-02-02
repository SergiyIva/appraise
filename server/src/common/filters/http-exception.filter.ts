import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { GqlContextType } from "@nestjs/graphql";
import { Request, Response } from "express";
import { GraphQLError } from "graphql/error/GraphQLError";

@Catch(HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    if (host.getType<GqlContextType>() === "graphql") {
      throw new GraphQLError(exception.message);
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception?.getStatus() : 500;

    response.status(status).json({
      error:
        exception instanceof HttpException
          ? exception.getResponse()
          : exception.message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
