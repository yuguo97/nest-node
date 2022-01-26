/*
 * @Author: your name
 * @Date: 2021-03-22 11:43:37
 * @LastEditTime: 2021-03-22 11:44:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \github\Nest.js-node\src\server\upload\upload.dao.ts
 */
import { ApiProperty } from '@nestjs/swagger';

export class UploadDao {
  // swagger配置项
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  file: any[];
}
export class UploadsDao {
  @ApiProperty({ description: '文件id' })
  id: number;

  @ApiProperty({ description: '文件名称' })
  name: string;

  @ApiProperty({ description: '文件相对路径' })
  path: string;

  @ApiProperty({ description: '文件路径' })
  pathUrl?: string;

  @ApiProperty({ description: '文件大小' })
  size?: number;

  @ApiProperty({ description: '文件类型' })
  type?: string;

  @ApiProperty({ description: '文件创建时间' })
  createTime: string;
}