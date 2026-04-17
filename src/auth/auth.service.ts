import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { signInDto } from './dto/sign-auth.dto';
import { signupDto } from './dto/signup-auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prismaService: PrismaService
  ) { }


  async signIn(signInDto: signInDto
  ): Promise<{ token: string, user: any }> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: signInDto.email
      }
    });
    if (!user) {
      
      throw new NotFoundException('User don\'t exists');
    }
   
    if (!(user && bcrypt.compareSync(signInDto.password, user.password))) {
      console.log(user.password, signInDto.password);
      throw new UnauthorizedException();
    }
    const payload = { sub: user.email, username: user.email };
    
    return { token: await this.jwtService.signAsync(payload), user: user };
   
    
  }

  async signUp(signupDto: signupDto){
    try {
      const existingUser = await this.userService.findbyEmail(signupDto.email);
      if (existingUser) {
      console.log('User already exists with email:', signupDto.email);
      return {'token': 'User already exists'};
      //throw new UnauthorizedException();
    }
    const hashedPassword: string = await bcrypt.hash(signupDto.password, 10);
    signupDto.password = hashedPassword;
    await this.userService.create(signupDto);
    const payload = { sub: signupDto.email, username: signupDto.email };
    return {
      // 💡 Here the JWT secret key that's used for signing the payload 
      // is the key that was passsed in the JwtModule
      token: await this.jwtService.signAsync(payload),
    };
      
    }
    
    catch (error) {
      if (error instanceof NotFoundException) {
        return {'token': 'User already exists'};
      }
  }
}
async geAllUsers() {
  return await this.prismaService.user.findMany();
}


}
