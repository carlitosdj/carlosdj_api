import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  //new = never used
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    const isMatchPassword = await bcrypt.compare(pass, user?.passwordHash);

    if (user && isMatchPassword) {
      //const { password_hash, ...result } = user;
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    const isMatch = await bcrypt.compare(pass, user?.passwordHash);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    //const payload = { sub: user.id, email: user.email };

    //Atualiza last login:
    let date = new Date()
    this.userService.update(user.id, {
      lastLoginAt: date
    })

    const payload = { ...user };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
    // //const { password, ...result } = user;
    // const { ...result } = user;
    // //TODO: Generate a JWT and return it here
    // //instead of the user object

    // return result;
  }

  async signInAdmin(email: string, pass: string): Promise<any> {
    const user = await this.userService.findAdminByEmail(email);

    const isMatch = await bcrypt.compare(pass, user?.passwordHash);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    //const payload = { sub: user.id, email: user.email };
    const payload = { ...user };

    //Atualiza last login:
    let date = new Date()
    this.userService.update(user.id, {
      lastLoginAt: date
    })
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
    // //const { password, ...result } = user;
    // const { ...result } = user;
    // //TODO: Generate a JWT and return it here
    // //instead of the user object

    // return result;
  }

  //new = never used
  async signUp(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      throw new HttpException('Username taken', HttpStatus.BAD_REQUEST);
    }

    const hash = await bcrypt.hash(pass, saltOrRounds);
    const date = new Date();
    const newUser = await this.userService.create({
      email,
      passwordHash: hash,
      createdAt: date,
      name: 'teste',
    });
    return newUser;
  }
}
