import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  //UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from './auth.public.decorator';
//import { UseRoles } from 'nest-access-control';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('loginadm')
  signInAdmin(@Body() signInDto: Record<string, any>) {
    return this.authService.signInAdmin(signInDto.email, signInDto.password);
  }

  //@UseGuards(ACGuard)
  // @UseRoles({
  //   possession: 'own',
  //   action: 'read',
  //   resource: 'user',
  // })
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
