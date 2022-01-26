/*
 * @Author: your name
 * @Date: 2021-03-18 15:31:50
 * @LastEditTime: 2021-04-11 12:02:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \github\Nest.js-node\src\server\users\users.controller.ts
 */
import { Controller, Body, Post, UseGuards,HttpCode} from '@nestjs/common';
import {
  ApiTags,
  ApiParam,
  ApiBody,
  ApiOperation
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { IHttpData , Reluct } from '../utils/tools/result';
import { UsersDao } from './users.dao';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('用户接口')
@Controller('users')
export class UsersController {
    constructor(
      private readonly usersService: UsersService
      ) { }
      
    @UseGuards(AuthGuard('jwt'))
    @Post('list')
    @HttpCode(200)
    async findAll(
      @Body("pageNum") pageNum?:number,
      @Body("pageSize") pageSize?:number,
      @Body("username") username?:string,
    ): Promise<IHttpData> {
      const data = await this.usersService.findAll(pageNum,pageSize,username);
      return new Reluct(200, data, '查询成功', true);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('getInfo')
    @HttpCode(200)
    async getById(@Body('id') id: number): Promise<IHttpData> {
      const data = await this.usersService.getById(id);
      return new Reluct(200, data , '获取成功', true);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: '新增用户' })
    @Post('add')
    @HttpCode(200)
    @ApiBody({ type: UsersDao })
    async add(@Body() data: UsersDao): Promise<IHttpData> {
      const res = await this.usersService.findByUsername(data.username);
      if(res && res.username === data.username){
        return new Reluct(5101, null , '用户账户已经存在不能添加', false); 
      }else{
        const result = await this.usersService.add(data);
        return new Reluct(200, result , '新增成功', true); 
      }
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: '编辑用户' })
    @Post('update')
    @HttpCode(200)
    @ApiBody({ type: UsersDao })
    async update(@Body() data: UsersDao): Promise<IHttpData> {
      const res = await this.usersService.getById(data.id);
      if(res && res.isSuper !== 0){
        await this.usersService.update(data);
        return new Reluct(200, null , '编辑成功', true);
      }else{ 
        return new Reluct(5101, null , '超级用户不能编辑', false);
      }
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: '删除用户' })
    @Post('delete')
    @HttpCode(200)
    @ApiParam({
      name: 'id',
      description: '这是配置id',
    })
    async delete(@Body('id') id: number): Promise<IHttpData> {
        const res = await this.usersService.getById(id);
        if(res && res.isSuper !== 0){
          const result = await this.usersService.delete(id);
          return new Reluct(200, result , '删除成功', true); 
        }else{
          return new Reluct(5101, null , '超级用户不能删除', false);
        }
    }
}
