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

  async findAll(page: number, take: number) {
    if (page == 0) page = 1;
    const skip = take * (page - 1);
    const data = await this.prismaService.user.findMany({
      skip,
      take,
    });
    const count = await this.prismaService.user.count();
    return {
      data,
      count,
    };
  }

  findOne(id: number) {
    return this.prismaService.user.findFirstOrThrow({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.prismaService.user.findFirstOrThrow({
      where: { email },
      include: {
        city: true,
        state: true
      }
    });
  }

  findAdminByEmail(email: string) {
    return this.prismaService.user.findFirstOrThrow({
      where: { AND: [{ email, roles: 'admin' }] },
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
      return await this.findByEmail(createUserDto.email)
      //throw new InvalidUserError('User already exists');
    }
    const { newPassword, ...result } = createUserDto;
    void newPassword;
    //console.log('newPass', newPassword);
    const date = new Date();
    if (createUserDto.newPassword) {
      const saltOrRounds = 10;
      const password = createUserDto.newPassword;
      //console.log('password', password);
      const hash = await bcrypt.hash(password, saltOrRounds);
      return this.prismaService.user.create({
        data: {
          ...result,
          created_at: date.getTime() / 1000,
          password_hash: hash,
        },
        include: {
          city: true,
          state: true
        }
      });
    } else {
      return this.prismaService.user.create({
        data: {
          ...result,
          created_at: date.getTime() / 1000,
        },
        include: {
          city: true,
          state: true
        }
      });
    }
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
    // console.log('update', id);
    // console.log('opaa', updateUserDto.newPassword);
    const { newPassword, ...result } = updateUserDto;
    void newPassword; //?
    // console.log('newPass', newPassword);

    const date = new Date();
    if (updateUserDto.newPassword) {
      const saltOrRounds = 10;
      const password = updateUserDto.newPassword;
      //console.log('password', password);
      const hash = await bcrypt.hash(password, saltOrRounds);

      return this.prismaService.user.update({
        where: { id },
        data: {
          ...result,
          updated_at: date.getTime() / 1000,
          password_hash: hash,
        },
        include: {
          city: true,
          state: true
        }
      });
    } else {
      return await this.prismaService.user.update({
        where: { id },
        data: {
          ...result,
          updated_at: date.getTime() / 1000,
        },
        include: {
          city: true,
          state: true
        }
      });
    }
  }

  async remove(id: number) {
    return await this.prismaService.user.delete({ where: { id } });
  }
}
