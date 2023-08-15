import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto, AuthSignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signin(dto: AuthDto) {
    try {
      // find user
      let user = await this.prisma.user.findFirst({
        where: { email: dto.email },
      });
      if (!user) {
        return new ForbiddenException('Account Not Found');
      }
      const passwordMatch = await argon.verify(user.hash, dto.password);
      if (passwordMatch) {
        let accessToken = await this.signToken(user.id, user.email);
        return {
          message: 'Logged In Successfully',
          accessToken,
        };
      } else {
        return new ForbiddenException('Incorrect Login or Password');
      }
    } catch (error) {
      console.log(error);
      return { message: 'Oops Something Went Wrong' };
    }
  }
  //Sign UP
  async signup(dto: AuthSignUpDto) {
    try {
      //generate the password hash
      const hash = await argon.hash(dto.password);
      //save the user in db
      const user = await this.prisma.user.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          userName: dto.userName,
          contact: dto.contact,
          email: dto.email,
          hash,
        },
      });
      let accessToken = await this.signToken(user.id, user.email);
      // return the saved user
      return { message: 'Registered Successfully', accessToken };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken');
        }
      }
      throw error;
    }
  }

  //Sign Token
  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
