/*
 * @Author: your name
 * @Date: 2021-03-22 11:00:40
 * @LastEditTime: 2021-03-26 10:08:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \github\Nest.js-node\src\server\users\users.dao.ts
 */
import { ApiProperty } from '@nestjs/swagger';

export class UsersDao {
    @ApiProperty({ description: '配置唯一id,创建用户不传' })
    id?: number;
    @ApiProperty({ description: '用户账户' })
    username?: string;
    @ApiProperty({ description: '用户名称' })
    nickname?: string;
    @ApiProperty({ description: '用户密码' })
    password?: string;
    @ApiProperty({ description: '用户年龄' })
    age?: number;
    @ApiProperty({ description: '用户头像' })
    avatar?: string;
    @ApiProperty({ description: '超级管理员' })
    isSuper?: number;
    @ApiProperty({ description: '用户角色' })
    roleId?: number;
  }