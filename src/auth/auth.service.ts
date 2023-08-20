import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto, AuthSignUpDto } from './dto';
import { uid } from 'uid/single';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { googleUserInterface } from 'types';

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
      if (user.logintype === 'GOOGLE' && !user?.hash.length) {
        return new ForbiddenException(
          'Account Registered with Google Authentication Please Try using google',
        );
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
  async googleContinue(
    googleUser: googleUserInterface,
    // access_token: string,
    // refresh_token: string,
  ) {
    console.log('GoogleUser', googleUser);
    try {
      let user: User;
      user = await this.prisma.user.findUnique({
        where: { email: googleUser?.email },
      });
      if (!user) {
        let userName = googleUser?.name.replace(' ', '') + uid(4);
        user = await this.prisma.user.create({
          data: {
            firstName: googleUser?.given_name,
            lastName: googleUser?.family_name,
            userName,
            email: googleUser?.email,
            profile: googleUser?.picture,
            logintype: 'GOOGLE',
            contact: '',
            hash: '',
          },
        });
      }
      let accessToken = await this.signToken(user.id, user.email);
      console.log('Access Token', accessToken);
      return accessToken;
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
          throw new ForbiddenException('Account Already Registered');
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
    const jwtToken = this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });
    return jwtToken;
  }
}
