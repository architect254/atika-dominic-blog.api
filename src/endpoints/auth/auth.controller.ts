import { Controller, UnauthorizedException, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from '@core/services/auth/auth.service';

import { User } from '@core/models/user/user.entity';

import { JwtPayload } from '@core/models/jwt.payload';

import { SignInCredentialsDto } from '@core/models/auth/sign-in.dto';
import { SignUpCredentialsDto } from '@core/models/auth/sign-up.dto';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/sign-up')
  async signUp(
    @Body()
    payload: SignUpCredentialsDto,
  ): Promise<User> {
    return this.authService.signUp(payload);
  }

  @Post('/sign-in')
  async signIn(
    @Body()
    payload: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.authService.signIn(payload);
    if (!user) {
      throw new UnauthorizedException('Invalid User Credentials');
    }
    delete user.password && delete user.salt;
    const jwtPayload: JwtPayload = { user };
    const accessToken = await this.jwtService.sign(jwtPayload);

    return { accessToken };
  }
}
