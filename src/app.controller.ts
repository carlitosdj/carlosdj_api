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

  @SkipAuth()
  @Get('teste4')
  getTest4(): string {
    return this.appService.getTest4();
  }

  @SkipAuth()
  @Get('teste5')
  getTest5(): string {
    return this.appService.getTest5();
  }

  @SkipAuth()
  @Get('teste6')
  getTest6(): string {
    return this.appService.getTest6();
  }

  @SkipAuth()
  @Get('teste6')
  getTest7(): string {
    return this.appService.getTest7();
  }
}
