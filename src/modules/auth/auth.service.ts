import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async getUser() {
    const user = { name: 'admin', password: '123' };
    if (user && user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log(user);

    const payload = { username: user.username, sub: '123' };
    return {
      acess_token: this.jwtService.sign(payload),
    };
  }
}
