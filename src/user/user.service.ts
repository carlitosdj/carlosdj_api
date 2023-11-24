import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcryptjs';
import * as schema from '../_schemas/schema';

import { InvalidUserError } from 'src/errors/invalid-user.error';
import { DB, DbType } from 'src/drizzle/providers/drizzle.providers';
import { and, eq, like, or, sql } from 'drizzle-orm';
import { randomUUID } from 'node:crypto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(DB) private readonly db: DbType,
    private mailService: MailService,
  ) {}

  async findAll(page: number, take: number) {
    if (page == 0) page = 1;
    const skip = take * (page - 1);

    const data = await this.db.query.user.findMany({
      limit: take,
      offset: skip,
      with: {
        city: true,
        state: true,
      },
    });

    const result = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(schema.user);

    return {
      data,
      //count: data.length,
      count: result[0].count,
    };
  }

  async findOne(id: number) {
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
  }

  async findAdminByEmail(email: string) {
    return await this.db.query.user.findFirst({
      where: and(eq(schema.user.email, email), eq(schema.user.roles, 'admin')),
    });
  }

  async searchUser(search: string) {
    return this.db.query.user.findMany({
      where: or(
        like(schema.user.name, `%${search}%`),
        like(schema.user.email, `%${search}%`),
      ),
    });
  }

  async userExists(email: string) {
    const result = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(schema.user)
      .where(eq(schema.user.email, email));
    console.log('RESULT', result[0].count);
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
    }
  }

  async recovery(email: string) {
    const userExists = await this.userExists(email);

    if (!userExists) {
      console.log('User not exists');
      throw new InvalidUserError('User not exists');
    } else {
      //console.log('Usuario existe', email);
      //Acha usuario
      const user = await this.db.query.user.findFirst({
        where: eq(schema.user.email, email),
      });

      //Seta nova authKey
      user.authKey = randomUUID();
      //Edita usuario
      await this.update(user.id, user);

      //Envia email
      this.mailService.sendRecoveryMail(user);

      return {
        msg: 'Ok!',
      };
      // SendMailController(request.body.email, 'Recuperar senha', 'Link para recuperação: https://associacao.labiopalatina.com.br/auth/change/'+user.email+'/'+user.auth_key)
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { newPassword, ...result } = updateUserDto;
    console.log('result', result);
    void newPassword;

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
    } else {
      await this.db
        .update(schema.user)
        .set({
          ...result,
        })
        .where(eq(schema.user.id, id));

      // return await this.db.query.user.findFirst({
      //   where: eq(schema.user.id, id),
      //   with: {
      //     city: true,
      //     state: true,
      //   },
      // });
    }

    //if(updateUserDto.cit)

    return await this.db.query.user.findFirst({
      where: eq(schema.user.id, id),
      with: {
        city: true,
        state: true,
      },
    });
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
