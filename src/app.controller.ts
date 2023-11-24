import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipAuth } from './auth/auth.public.decorator';

@Controller()
export class AppController {
  //Container de serviços
  constructor(private readonly appService: AppService) {}

  @SkipAuth()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @SkipAuth()
  @Get('teste')
  getTest2(): string {
    return this.appService.getTest2();
  }

  @SkipAuth()
  @Get('teste3')
  getTest3(): string {
    return this.appService.getTest3();
  }
}
