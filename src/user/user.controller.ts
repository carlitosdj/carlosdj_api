import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRolesBuilder() private readonly roleBuilder: RolesBuilder,
  ) {}

  @Get('all/:page/:take')
  findAll(
    @Param('page') page: number,
    @Param('take') take: number,
    @Request() req,
  ) {
    const permission = this.roleBuilder.can(req.user.roles).readAny('user');
    if (permission.granted) return this.userService.findAll(page, take);
    throw new UnauthorizedException();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get('search/:search')
  searchUser(@Param('search') search: string) {
    return this.userService.searchUser(search);
  }

  @Get('exists/:email')
  userExists(@Param('email') email: string) {
    return this.userService.userExists(email);
  }

  @Get('recovery/:email')
  recovery(@Param('email') email: string) {
    return this.userService.recovery(email);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const date = new Date();
    return this.userService.create({
      ...createUserDto,
      created_at: date.getTime() / 1000,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    const permission =
      +req.user.id === +id
        ? this.roleBuilder.can(req.user.roles).updateOwn('user')
        : this.roleBuilder.can(req.user.roles).updateAny('user');

    const date = new Date();
    if (permission.granted)
      return this.userService.update(+id, {
        ...updateUserDto,
        updated_at: date.getTime() / 1000,
      });
    throw new UnauthorizedException();
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const permission =
      +req.user.id === +id
        ? this.roleBuilder.can(req.user.roles).deleteOwn('user')
        : this.roleBuilder.can(req.user.roles).deleteAny('user');

    if (permission.granted) return this.userService.remove(+id);
    throw new UnauthorizedException();
  }
}
