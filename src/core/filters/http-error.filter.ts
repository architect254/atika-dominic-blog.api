import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    const errorResponse = {
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      name: exception.name,
      cause: exception.cause,
      message: exception.message,
    };

    let status = 500;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
    }
    errorResponse[`status`] = status;

    Logger.error(
      `${errorResponse.method} -> ${errorResponse.path} ${status} ${errorResponse.name} [ ${errorResponse.message} ]`,
      exception.stack,
      'HTTP_ERROR_FILTER',
    );

    ctx.getResponse().status(status).json(errorResponse);
  }
}
