/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { UsersService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Public } from './decorators/decorator';
import { signInDto } from './dto/sign-auth.dto';
import { signupDto } from './dto/signup-auth.dto';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) { }

  private setAuthCookie(response: Response, token: string) {
    response.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    });
  }

  @Post('/signup')
  @Public()
  async signup(
    @Body() createAuthDto: signupDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.signUp(createAuthDto);
    if (result?.token && result.token !== 'User already exists') {
      this.setAuthCookie(response, result.token);
    }
    return result;
  }

  @Public()
  @Post('/signin')
  async login(
    @Body() createAuthDto: signInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token, user } = await this.authService.signIn(createAuthDto);
    this.setAuthCookie(response, token);

    return { user, token };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @Get('all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
