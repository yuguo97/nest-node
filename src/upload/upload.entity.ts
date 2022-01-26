/*
 * @Author: your name
 * @Date: 2021-03-19 09:47:41
 * @LastEditTime: 2021-03-19 16:36:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \github\Nest.js-node\src\server\upload\upload.entity.ts
 */
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity("sys_upload")
export class UploadEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // 文件名
  @Column()
  name: string;
  // 文件相对位置
  @Column()
  path: string;
  // 文件在服务器的绝对位置
  @Column({ default: null, name: 'path_local' })
  pathLocal: string;
  // 文件的外部可访问地址
  @Column({ default: null, name: 'path_url' })
  pathUrl?: string;
  // 文件大小
  @Column({ default: null })
  size?: number;
  // 文件种类  img 图片，file 文件
  @Column({ default: null })
  type?: string;
  // 文件创建时间
  @Column({ type: 'datetime', name: 'create_time' })
  createTime: string;
}