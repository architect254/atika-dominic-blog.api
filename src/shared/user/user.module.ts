import { Module } from '@nestjs/common';
import { UserService } from '../../core/services/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/user/user.entity';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
 