import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Error } from 'mongoose';
import { ErrorsEnum } from 'utils/errors';

enum MongoErrors {
  MongooseError = 'MongooseError',
  DocumentNotFoundError = 'DocumentNotFoundError',
  CastError = 'CastError',
  DisconnectedError = 'DisconnectedError',
  DivergentArrayError = 'DivergentArrayError',
  MissingSchemaError = 'MissingSchemaError',
  ValidatorError = 'ValidatorError',
  ValidationError = 'ValidationError',
  ObjectExpectedError = 'ObjectExpectedError',
  ObjectParameterError = 'ObjectParameterError',
  OverwriteModelError = 'OverwriteModelError',
  ParallelSaveError = 'ParallelSaveError',
  StrictModeError = 'StrictModeError',
  VersionError = 'VersionError',
}

@Catch(Error)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let error;

    switch (exception.name) {
      case MongoErrors.DocumentNotFoundError: {
        error = {
          statusCode: HttpStatus.NOT_FOUND,
          message: ErrorsEnum.notFound,
        };
        break;
      }

      case MongoErrors.ValidationError: {
        error = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ErrorsEnum.dbValidationError,
        };
        break;
      }

      default: {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ErrorsEnum.internalError,
        };
        break;
      }
    }

    response.status(error.statusCode).json(error);
  }
}
