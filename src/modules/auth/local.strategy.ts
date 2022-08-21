import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    if (username !== 'admin' || password !== '123') {
      throw new HttpException(
        {
          message: 'Request data validation failed',
          error: 'Invalid credentials',
        },
        HttpStatus.BAD_REQUEST,
      );
      // throw new UnauthorizedException();
    }
    return { username, password };
  }
}
