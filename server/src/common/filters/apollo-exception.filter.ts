import { UserInputError } from "@nestjs/apollo";
import { Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { GraphQLError } from "graphql/error/GraphQLError";

@Catch(GraphQLError, UserInputError)
export class ApolloExceptionFilter implements ExceptionFilter {
  private static readonly logger = new Logger("ApolloExceptionFilter");

  catch(exception: Error) {
    if (process.env.NODE_ENV === "development") {
      ApolloExceptionFilter.logger.error(exception.message, exception.stack);
    }

    return exception;
  }
}
