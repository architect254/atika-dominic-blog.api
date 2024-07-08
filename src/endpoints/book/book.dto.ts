import { IsNotEmpty, IsString, IsEmail, IsNumber} from 'class-validator';

export class BookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  themes: string;

  @IsNumber()
  @IsNotEmpty()
  cost: number;
}
