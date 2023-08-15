import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostBookMarkDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;
  
  @IsString()
  link: string;
}
