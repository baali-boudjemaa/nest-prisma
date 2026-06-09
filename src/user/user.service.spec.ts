import { UserService } from './user.service';

describe('UserService', () => {
  const mockPrisma: any = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };

  let service: UserService;

  beforeEach(() => {
    service = new UserService(mockPrisma as any);
    jest.clearAllMocks();
  });

  it('throws when creating a user that already exists', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ id: 1, email: 'a' });
    await expect(
      service.create({ email: 'a', password: 'x' } as any),
    ).rejects.toThrow();
  });

  it('creates a user when not existing', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);
    mockPrisma.user.create.mockResolvedValue({ id: 2, email: 'b' });
    const res = await service.create({ email: 'b', password: 'p' } as any);
    expect(res).toEqual({ id: 2, email: 'b' });
    expect(mockPrisma.user.create).toHaveBeenCalledWith({ data: { email: 'b', password: 'p' } });
  });

  it('delegates findbyEmail to prisma', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ id: 3, email: 'c' });
    const res = await service.findbyEmail('c');
    expect(res).toEqual({ id: 3, email: 'c' });
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
