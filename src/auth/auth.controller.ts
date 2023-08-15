import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto, AuthSignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: AuthSignUpDto) {
    return this.authService.signup(dto);
  }
  @Post('signin')
  async signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
