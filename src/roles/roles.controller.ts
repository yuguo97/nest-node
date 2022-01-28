import { Controller, Body, Post, UseGuards, HttpCode } from '@nestjs/common';
import { IHttpData, Reluct } from '../utils/tools/result';
import { AuthGuard } from '@nestjs/passport';
import { RolesService } from './roles.service';
import { RolesDao } from './roles.dao';
import { ApiTags, ApiParam, ApiBody, ApiOperation } from '@nestjs/swagger';

@ApiTags('角色接口')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('list')
  @HttpCode(200)
  async findAll(): Promise<IHttpData> {
    const data = await this.rolesService.find();
    return new Reluct(200, data, '查询成功', true);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('getInfo')
  @HttpCode(200)
  async getById(@Body('id') id: number): Promise<IHttpData> {
    const data = await this.rolesService.getById(id);
    return new Reluct(200, data, '获取成功', true);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  @HttpCode(200)
  async add(@Body() data: RolesDao): Promise<IHttpData> {
    const res = await this.rolesService.findByUsername(data.name);
    if (res && res.name === data.name) {
      return new Reluct(5101, null, '角色已经存在不能添加', false);
    } else {
      const result = await this.rolesService.add(data);
      return new Reluct(200, result, '新增成功', true);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('update')
  @HttpCode(200)
  async update(@Body() data: RolesDao): Promise<IHttpData> {
    const res = await this.rolesService.getById(data.id);
    if (res && res.ident !== '000') {
      await this.rolesService.update(data);
      return new Reluct(200, null, '编辑成功', true);
    } else {
      return new Reluct(5101, null, '超级角色不能编辑', false);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('delete')
  @HttpCode(200)
  async delete(@Body('id') id: number): Promise<IHttpData> {
    const res = await this.rolesService.getById(id);
    if (res && res.ident !== '000') {
      await this.rolesService.delete(id);
      return new Reluct(200, null, '删除成功', true);
    } else {
      return new Reluct(5101, null, '超级角色不能删除', false);
    }
  }
}
