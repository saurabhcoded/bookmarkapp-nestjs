import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostBookMarkDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  link: string;
}
export class editDto extends PostBookMarkDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  slug: string;
}
