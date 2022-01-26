/*
 * @Author: your name
 * @Date: 2021-04-08 10:41:01
 * @LastEditTime: 2021-04-08 10:59:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nestjs-node\src\server\roles\roles.module.ts
 */
import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesEntity } from './roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';

@Module({
  imports:[TypeOrmModule.forFeature([RolesEntity])],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService]
})
export class RolesModule {}
