import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

import * as bcrypt from 'bcrypt';
import { InvalidUserError } from 'src/errors/invalid-user.error';
//import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  findAll(page: number, take: number) {
    if (page == 0) page = 1;
    const skip = take * (page - 1);
    return this.prismaService.user.findMany({
      skip,
      take,
    });
  }

  findOne(id: number) {
    return this.prismaService.user.findFirstOrThrow({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.prismaService.user.findFirstOrThrow({
      where: { email },
    });
  }

  searchUser(search: string) {
    return this.prismaService.user.findMany({
      where: {
        OR: [
          {
            name: { contains: search },
          },
          {
            email: { contains: search },
          },
        ],
      },
    });
  }

  async userExists(email: string) {
    return (
      (await this.prismaService.user.count({
        where: {
          email,
        },
      })) !== 0
    );
  }

  async create(createUserDto: CreateUserDto) {
    if (await this.userExists(createUserDto.email)) {
      throw new InvalidUserError('User already exists');
    }

    const saltOrRounds = 10;
    const password = createUserDto.newPassword;
    //console.log('password', password);
    const hash = await bcrypt.hash(password, saltOrRounds);

    return this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        created_at: createUserDto.created_at,
        name: createUserDto.name,
        password_hash: hash,
        roles: createUserDto.roles,
      },
    });
  }

  async recovery(email: string) {
    if (await !this.userExists(email)) {
      throw new InvalidUserError('User not exists');
    }
    //Troca auth_key
    //Envia email para usuário
    return 'Email enviado..';
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    //console.log('update', id);

    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.user.delete({ where: { id } });
  }
}
