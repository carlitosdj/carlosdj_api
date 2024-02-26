import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'A api carlosdj.com.br/api está online!';
  }
}
