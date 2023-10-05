import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    const isMatch = await bcrypt.compare(pass, user?.password_hash);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    //const payload = { sub: user.id, email: user.email };
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
}
