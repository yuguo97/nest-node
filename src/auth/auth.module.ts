/*
 * @Author: your name
 * @Date: 2021-03-25 15:28:42
 * @LastEditTime: 2021-04-10 22:15:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nestjs-node\src\server\auth\auth.module.ts
 */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MenusModule } from '../menus/menus.module';
import { UsersModule } from '../users/users.module';
import { CacheModule } from '../cache/cache.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { CryptoUtil } from '../utils/tools/crypto'
@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600000s' },
    }),
    MenusModule,
    UsersModule,
    CacheModule
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy,CryptoUtil]
})
export class AuthModule {}
