import { Controller, Get,Param, Body, Post, UseGuards,HttpCode} from '@nestjs/common';
import { CacheService } from './cache.service';
import { AuthGuard } from '@nestjs/passport';
import { IHttpData , Reluct } from '../utils/tools/result';

import {
  ApiTags,
  ApiParam,
  ApiBody,
  ApiOperation
} from '@nestjs/swagger';

@ApiTags('缓存接口')
@Controller('cache')
export class CacheController {
    constructor(private readonly cacheService: CacheService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('set')
    @HttpCode(200)
    async setCache(@Body() data: any): Promise<IHttpData> {
        this.cacheService.setCache(data.key, data.value, data.seconds);
        return new Reluct(200, null, '添加成功', true);
    }


    @UseGuards(AuthGuard('jwt'))
    @Post('get')
    @HttpCode(200)
    async getCache(@Body('key') key:string): Promise<IHttpData> {
      const data = await this.cacheService.getCache(key);
      return new Reluct(200, data, '获取成功', true);
    }
}
