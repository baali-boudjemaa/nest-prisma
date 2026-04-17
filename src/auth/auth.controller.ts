import { Body, Controller, Get, Param, Post, Res, } from '@nestjs/common';
import type { Response } from 'express';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Public } from './decorator';
import { signInDto } from './dto/sign-auth.dto';
import { signupDto } from './dto/signup-auth.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

  @Post("/signup")
  @Public()
  async signup(@Body() createAuthDto: signupDto) {
    return await this.authService.signUp(createAuthDto);
  }
  
  @Public()
@Post('/signin')
async login(
  @Body() createAuthDto: signInDto,
  @Res({ passthrough: true }) response: Response,
) {
  const { token, user } = await this.authService.signIn(createAuthDto);

  response.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000,
    path: '/',
  });

  return { user };
}

 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @Get("all")
  getAllUsers() {
    return this.authService.geAllUsers();
  }


}
