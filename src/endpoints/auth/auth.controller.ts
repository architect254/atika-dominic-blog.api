import {
  Controller,
  Post,
  Body,
  ConflictException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from '@core/models/jwt.payload';

import { User } from '@endpoints/user/user.entity';
import { AuthService } from '@endpoints/auth/auth.service';
import { SignInCredentialsDto } from '@endpoints/auth/sign-in.dto';
import { SignUpCredentialsDto } from '@endpoints/auth/sign-up.dto';
import { configureFileStorage } from '@core/config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/sign-up')
  @UseInterceptors(
    FileInterceptor('profile_image', configureFileStorage(`user_profile`)),
  )
  async signUp(
    @Body()
    payload: SignUpCredentialsDto,
    @UploadedFile() file: any,
  ): Promise<User> {
    const payloadWithProfile: SignUpCredentialsDto & typeof file = {
      ...payload,
      profile_image: file?.filename,
    };
    return this.authService.signUp(payloadWithProfile);
  }

  @Post('/sign-in')
  async signIn(
    @Body()
    payload: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.authService.signIn(payload);
    if (!user) {
      throw new ConflictException('invalid user credentials');
    }
    delete user.password && delete user.salt;
    const jwtPayload: JwtPayload = { user };
    const accessToken = await this.jwtService.sign(jwtPayload);

    return { accessToken };
  }
}
