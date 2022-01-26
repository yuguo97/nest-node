/*
 * @Author: your name
 * @Date: 2021-03-22 15:16:32
 * @LastEditTime: 2021-04-09 15:56:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \github\Nest.js-node\src\server\menus\menus.module.ts
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenusEntity } from './menus.entity';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
@Module({
    imports:[TypeOrmModule.forFeature([MenusEntity])],
    controllers: [MenusController],
    providers: [MenusService],
    exports: [MenusService]
})
export class MenusModule {}
