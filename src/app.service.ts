import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Servidor Instituto Defelícibus - Api CARLOSDJ';
  }
}
