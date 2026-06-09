import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const mockPrisma: any = {
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockJwt: Partial<JwtService> = {
    signAsync: jest.fn().mockResolvedValue('signed-token'),
  };

  const mockUserService: any = {
    findbyEmail: jest.fn(),
    create: jest.fn(),
  };

  let service: AuthService;

  beforeEach(() => {
    service = new AuthService(mockUserService, mockJwt as any, mockPrisma as any);
    jest.clearAllMocks();
  });

  it('throws NotFoundException when signing in with unknown email', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);
    await expect(
      service.signIn({ email: 'noone@test', password: 'x' } as any),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('throws UnauthorizedException when password mismatch', async () => {
    const user = { email: 'a', password: 'hashed' };
    mockPrisma.user.findUnique.mockResolvedValue(user);
    jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);
    await expect(
      service.signIn({ email: 'a', password: 'wrong' } as any),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('returns token and user on successful signIn', async () => {
    const user = { email: 'a', password: 'hashed' };
    mockPrisma.user.findUnique.mockResolvedValue(user);
    jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
    const res = await service.signIn({ email: 'a', password: 'ok' } as any);
    expect(res.token).toBe('signed-token');
    expect(res.user).toBe(user);
  });

  it('returns already exists token on signUp when user exists', async () => {
    mockUserService.findbyEmail.mockResolvedValue({ email: 'a' });
    const res = await service.signUp({ email: 'a', password: 'p' } as any);
    expect(res.token).toContain('User already exists');
  });

  it('creates user and returns token on signUp when new', async () => {
    mockUserService.findbyEmail.mockResolvedValue(null);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed');
    mockUserService.create.mockResolvedValue({ id: 1, email: 'b' });
    const res = await service.signUp({ email: 'b', password: 'p', role: 'USER', name: 'n' } as any);
    expect(res.token).toBe('signed-token');
    expect(mockUserService.create).toHaveBeenCalled();
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
