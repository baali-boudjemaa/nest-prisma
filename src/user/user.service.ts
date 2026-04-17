import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: createUserDto.email  
      }
    });
    if (user) {
      throw new Error('User already exists');
    } 
   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

    return this.prismaService.user.create({
      data: createUserDto
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findbyEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email: email
      }
    });
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
