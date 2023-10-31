import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { PrismaService } from 'src/prisma/prisma/prisma.service';

import * as bcrypt from 'bcrypt';
import { InvalidUserError } from 'src/errors/invalid-user.error';
import { DB, DbType } from 'src/drizzle/providers/drizzle.providers';
//import { User } from '@prisma/client';
import * as schema from '../_schemas/schema';
import { and, eq, like, or, sql } from 'drizzle-orm';

@Injectable()
export class UserService {
  //constructor(private prismaService: PrismaService) {}
  constructor(@Inject(DB) private readonly db: DbType) {}

  async findAll(page: number, take: number) {
    if (page == 0) page = 1;
    const skip = take * (page - 1);

    const data = await this.db.query.user.findMany({
      limit: take,
      offset: skip,
    });

    return {
      data,
      count: data.length,
    };

    // if (page == 0) page = 1;
    // const skip = take * (page - 1);
    // const data = await this.prismaService.user.findMany({
    //   skip,
    //   take,
    // });
    // const count = await this.prismaService.user.count();
    // return {
    //   data,
    //   count,
    // };
  }

  async findOne(id: number) {
    // return this.prismaService.user.findFirstOrThrow({
    //   where: { id },
    // });
    return await this.db.query.user.findFirst({
      where: eq(schema.user.id, id),
      // with: {
      //   wppgroup: true,
      // },
    });
  }

  async findByEmail(email: string) {
    return await this.db.query.user.findFirst({
      where: eq(schema.user.email, email),
      with: {
        city: true,
        state: true,
      },
    });
    // return this.prismaService.user.findFirstOrThrow({
    //   where: { email },
    //   include: {
    //     city: true,
    //     state: true
    //   }
    // });
  }

  async findAdminByEmail(email: string) {
    return await this.db.query.user.findFirst({
      where: and(eq(schema.user.email, email), eq(schema.user.roles, 'admin')),
    });
    // return this.prismaService.user.findFirstOrThrow({
    //   where: { AND: [{ email, roles: 'admin' }] },
    // });
  }

  async searchUser(search: string) {
    return this.db.query.user.findMany({
      where: or(
        like(schema.user.name, `%${search}%`),
        like(schema.user.email, `%${search}%`),
      ),
    });
    // return this.prismaService.user.findMany({
    //   where: {
    //     OR: [
    //       {
    //         name: { contains: search },
    //       },
    //       {
    //         email: { contains: search },
    //       },
    //     ],
    //   },
    // });
  }

  async userExists(email: string) {
    // return (
    //   (await this.prismaService.user.count({
    //     where: {
    //       email,
    //     },
    //   })) !== 0
    // );
    const result = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(schema.user)
      .where(eq(schema.user.email, email));
    return result[0].count !== 0;
  }

  async create(createUserDto: CreateUserDto) {
    if (await this.userExists(createUserDto.email)) {
      return await this.findByEmail(createUserDto.email);
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

      // return this.prismaService.user.create({
      //   data: {
      //     ...result,
      //     created_at: date.getTime() / 1000,
      //     password_hash: hash,
      //   },
      //   include: {
      //     city: true,
      //     state: true
      //   }
      // });
      const newItem = await this.db
        .insert(schema.user)
        .values({ ...createUserDto, passwordHash: hash });
      return await this.db.query.user.findFirst({
        where: eq(schema.user.id, newItem[0].insertId),
        with: {
          city: true,
          state: true,
        },
      });
    } else {
      const newItem = await this.db.insert(schema.user).values({ ...result });
      return await this.db.query.user.findFirst({
        where: eq(schema.user.id, newItem[0].insertId),
        with: {
          city: true,
          state: true,
        },
      });

      // return this.prismaService.user.create({
      //   data: {
      //     ...result,
      //     created_at: date.getTime() / 1000,
      //   },
      //   include: {
      //     city: true,
      //     state: true,
      //   },
      // });
    }
  }

  async recovery(email: string) {
    if (await !this.userExists(email)) {
      throw new InvalidUserError('User not exists');
    }
    // //Troca auth_key
    // //Envia email para usuário
    // return 'Email enviado..';
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

      await this.db
        .update(schema.user)
        .set({
          ...result,
          //updated_at: date.getTime() / 1000,
          passwordHash: hash,
        })
        .where(eq(schema.user.id, id));

      return await this.db.query.user.findFirst({
        where: eq(schema.user.id, id),
        with: {
          city: true,
          state: true,
        },
      });

      // return this.prismaService.user.update({
      //   where: { id },
      //   data: {
      //     ...result,
      //     updated_at: date.getTime() / 1000,
      //     password_hash: hash,
      //   },
      //   include: {
      //     city: true,
      //     state: true
      //   }
      // });
    } else {
      // return await this.prismaService.user.update({
      //   where: { id },
      //   data: {
      //     ...result,
      //     updated_at: date.getTime() / 1000,
      //   },
      //   include: {
      //     city: true,
      //     state: true
      //   }
      // });

      await this.db
        .update(schema.user)
        .set({
          ...result,
          //updated_at: date.getTime() / 1000,
        })
        .where(eq(schema.user.id, id));

      return await this.db.query.user.findFirst({
        where: eq(schema.user.id, id),
        with: {
          city: true,
          state: true,
        },
      });
    }
  }

  async remove(id: number) {
    // return await this.prismaService.user.delete({ where: { id } });
    // return this.prismaService.user.delete({ where: { id } });
    const itemRemoved = await this.db.query.user.findFirst({
      where: eq(schema.user.id, id),
    });
    await this.db.delete(schema.user).where(eq(schema.user.id, id));
    return itemRemoved;
    // return this.prismaService.componentExtra.delete({ where: { id } });
  }
}
