import { IsNotEmpty, IsString, IsEmail, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class ArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  keywords: string;

  @IsString()
  @IsNotEmpty()
  article_image: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
