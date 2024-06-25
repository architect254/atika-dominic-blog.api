import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@endpoints/user/user.entity';
import { UserService } from '@endpoints/user/user.service';
import { UserController } from '@endpoints/user/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
