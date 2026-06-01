/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorators/decorator';
import { PrismaService } from '../../prisma/prisma.service';
import { Console } from 'console';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const isPublic =
      this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [
          context.getHandler(),
          context.getClass(),
        ],
      );

    if (isPublic) {
      return true;
    }

    const request =
      context.switchToHttp().getRequest();

    const token =
      this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        'Token not found',
      );
    }

    try {
      const payload =
        await this.jwtService.verifyAsync(token);
      const user =
        await this.prisma.user.findUnique({
          where: {
            email: payload.sub,
          },
        });
      console.log('Decoded JWT payload:', payload);
       console.log('Decoded JWT payload:', user);
      if (!user) {
        throw new UnauthorizedException(
          'User not found',
        );
      }

      request.user = user;

      return true;
    } catch {
      throw new UnauthorizedException(
        'Invalid token or user not found',
      );
    }
  }

  private extractTokenFromHeader(
    request: any,
  ): string | undefined {
    const [type, token] =
      request.headers.authorization?.split(
        ' ',
      ) ?? [];

    return type === 'Bearer'
      ? token
      : undefined;
  }
}