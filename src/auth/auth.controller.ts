import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto, AuthSignUpDto } from './dto';
import { googleOauth } from './guard/googleOauth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: AuthSignUpDto) {
    return this.authService.signup(dto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
  @HttpCode(HttpStatus.OK)
  @Get('google')
  @UseGuards(googleOauth)
  async GoogleAuth() {}

  @Get('google/callback')
  @UseGuards(googleOauth)
  @HttpCode(HttpStatus.OK)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    try {
      const token = await this.authService.googleContinue(req?.user);
      res.json({
        message: 'Authentication Successfull',
        access_token: token,
      });
    } catch (error) {
      res.json({
        message: 'Error While Google Authentication',
        status: 'error',
      });
    }
  }
}
