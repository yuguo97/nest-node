/*
 * @Author: your name
 * @Date: 2021-03-27 10:05:30
 * @LastEditTime: 2021-04-08 14:01:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nestjs-node\src\server\auth\local.strategy.ts
 */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new HttpException('用户名或密码错误', HttpStatus.CREATED);
    }
    return user;
  }
}