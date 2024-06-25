import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDate,
  IsStrongPassword,
} from 'class-validator';
import { Type } from 'class-transformer';

import { SignInCredentialsDto } from './sign-in.dto';

export class SignUpCredentialsDto extends SignInCredentialsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  profile_image: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
