/*
 * @Author: your name
 * @Date: 2021-03-22 11:00:40
 * @LastEditTime: 2021-03-26 10:08:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \github\Nest.js-node\src\server\users\users.dao.ts
 */
import { ApiProperty } from '@nestjs/swagger';

export class RolesDao {
    @ApiProperty({ description: '配置唯一id,创建用户不传' })
    id?: number;
    @ApiProperty({ description: '角色名称' })
    name?: string;
    @ApiProperty({ description: '角色标识' })
    ident?: string;
    @ApiProperty({ description: '角色描述' })
    description?: string;
  }