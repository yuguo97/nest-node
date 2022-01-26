/*
 * @Author: your name
 * @Date: 2021-03-22 11:00:40
 * @LastEditTime: 2021-04-10 11:20:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \github\Nest.js-node\src\server\users\users.dao.ts
 */
import { ApiProperty } from '@nestjs/swagger';

export class menusDao {
    @ApiProperty({ description: '配置唯一id,创建用户不传' })
    id?: number;
    @ApiProperty({ description: '菜单' })
    name?: string;
    @ApiProperty({ description: '父级' })
    pid?: number;
    @ApiProperty({ description: '排序' })
    order?: number;
    @ApiProperty({ description: '路径' })
    url?: string;
    @ApiProperty({ description: '编码' })
    code?: string;
    @ApiProperty({ description: '图标' })
    icon?: string;
}