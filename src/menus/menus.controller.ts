/*
 * @Author: your name
 * @Date: 2021-04-09 15:44:19
 * @LastEditTime: 2021-04-10 14:30:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nestjs-node\src\server\menus\menus.controller.ts
 */
import { Controller, Get, Post, Body, Param, UseGuards,HttpCode} from '@nestjs/common';
import { MenusService } from './menus.service';
import { IHttpData , Reluct } from '../utils/tools/result';
import { menusDao } from './menus.dao';
import { AuthGuard } from '@nestjs/passport';

import {
   ApiTags,
   ApiParam,
   ApiBody,
   ApiOperation
 } from '@nestjs/swagger';
 
@ApiTags('菜单接口')
@Controller('menus')
export class MenusController {
    constructor(
        private readonly menusService: MenusService
     ) { }
     @UseGuards(AuthGuard('jwt'))
     @Post('list')
     @HttpCode(200)
     async findAll(): Promise<IHttpData> {
        const data = await this.menusService.findAll();
        return new Reluct(200, data, '查询成功', true); 
     }

     @UseGuards(AuthGuard('jwt'))
     @Post('add')
     @HttpCode(200)
     async addMenus(@Body() obj:menusDao): Promise<IHttpData> {
        const data = await this.menusService.add(obj);
        return new Reluct(200, data, '新增成功', true);
     }

     @UseGuards(AuthGuard('jwt'))
     @Post('update')
     @HttpCode(200)
     async updateMenus(@Body() obj:menusDao): Promise<IHttpData> {
        const data = await this.menusService.update(obj);
        return new Reluct(200, data, '更新成功', true);
     }

     @UseGuards(AuthGuard('jwt'))
     @Post('delete')
     @HttpCode(200)
     async delete(@Body('id') id: number): Promise<IHttpData> {
        await this.menusService.delete(id);
        return new Reluct(200, null , '删除成功', true);  
    }
}
