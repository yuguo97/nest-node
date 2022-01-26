/*
 * @Author: your name
 * @Date: 2021-03-18 15:41:41
 * @LastEditTime: 2021-03-25 15:04:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \github\login-node\src\users\users.module.ts
 */
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { RolesModule } from '../roles/roles.module';
import { CryptoUtil } from '../utils/tools/crypto'
@Module({
  imports:[
    TypeOrmModule.forFeature([UsersEntity]),
    RolesModule 
  ],
  controllers: [UsersController],
  providers: [UsersService,CryptoUtil],
  exports: [UsersService]
})
export class UsersModule {}
