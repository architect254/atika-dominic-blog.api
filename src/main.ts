import { AppModule } from './app.module';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  ValidationPipe,
  Logger,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import * as config from 'config';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const logger: Logger = new Logger('Bootstrap');
  const serverConfig = config.get('server');
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    bodyParser: true,
  });
  const PORT = process.env.PORT || serverConfig.port;

  app.setGlobalPrefix('api');

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());
  app.use(bodyParser.urlencoded({ extended: true }));

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  await app.listen(PORT);

  logger.log(`listening on port:${PORT}`);
}
bootstrap();
