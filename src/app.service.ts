import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getTest2(): string {
    return 'Teste2!';
  }

  getTest3(): string {
    return 'Teste3!';
  }
}
