import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class AuthorDto {
  @IsString()
  @IsNotEmpty()
  about_title: string;

  @IsString()
  @IsNotEmpty()
  about_description: string;

  @IsString()
  @IsNotEmpty()
  profile_image: string;

  @IsString()
  @IsNotEmpty()
  contact_title: string;

  @IsString()
  @IsNotEmpty()
  contact_description: string;

  @IsEmail()
  @IsNotEmpty()
  contact_email: string;

  @IsString()
  @IsNotEmpty()
  facebook_profile: string;

  @IsString()
  @IsNotEmpty()
  twitter_profile: string;

  @IsString()
  @IsNotEmpty()
  youtube_profile: string;
}
