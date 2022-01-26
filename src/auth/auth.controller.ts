/*
 * @Author: your name
 * @Date: 2021-03-25 15:27:17
 * @LastEditTime: 2021-04-08 14:02:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nestjs-node\src\server\auth\auth.controller.ts
 */
import { Controller, Request, Post, UseGuards, Get, Body, HttpCode} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { IHttpData , Reluct } from '../utils/tools/result';
import {
    ApiTags,
    ApiParam,
    ApiBody,
    ApiOperation
  } from '@nestjs/swagger';



@ApiTags('权限接口')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @HttpCode(200)
    async login(@Request() req:any): Promise<IHttpData> {
        const result = await this.authService.login(req.user);
        return new Reluct(200, result, '登录成功', true);
    }


    @UseGuards(AuthGuard('jwt'))
    @Post('profile')  
    async getUsername(
        @Body("username") username?:string,
        @Body("password") password?:string,
    ): Promise<IHttpData> {
        const user = await this.authService.findByUser(username);
        if (user.password === password) {
            const { password, ...result } = user;
            return new Reluct(200, result, '查询成功', true);
        }
        return new Reluct(5101, null, '查询失败', false);
    }


    @UseGuards(AuthGuard('jwt'))
    @Get('info')  
    async getInfo(): Promise<IHttpData> {
        const data =await this.authService.fetchInfo();
        return new Reluct(200, data, '查询成功', false);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    async getLogout(): Promise<IHttpData> {
        return new Reluct(200, '退出成功', '操作成功', false);
    }
}
