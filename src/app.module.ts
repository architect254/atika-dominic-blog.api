import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from '@core/config/typeorm.config';

import { AuthModule } from '@endpoints/auth/auth.module';
import { UserModule } from '@endpoints/user/user.module';

import { AppController } from 'app.controller';
import { AppService } from 'app.service';

import { HttpErrorFilter } from '@core/filters/http-error.filter';
import { LoggingInterceptor } from '@core/interceptors/logging.interceptor';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
