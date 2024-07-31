import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class AuthorDto {
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  education: string;

  @IsNotEmpty()
  @IsString()
  interests: string;

  @IsNotEmpty()
  @IsString()
  accomplishments: string;

  @IsNotEmpty()
  @IsString()
  expertise: string;

  @IsNotEmpty()
  @IsString()
  residence: string;

  @IsNotEmpty()
  @IsString()
  about_info: string;

  @IsNotEmpty()
  @IsString()
  facebook_profile: string;

  @IsNotEmpty()
  @IsString()
  twitter_profile: string;

  @IsNotEmpty()
  @IsString()
  whatsapp_profile: string;
}
