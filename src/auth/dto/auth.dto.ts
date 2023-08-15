import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
export class AuthSignUpDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  contact: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
