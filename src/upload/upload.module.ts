/*
 * @Author: your name
 * @Date: 2021-03-19 09:36:15
 * @LastEditTime: 2021-04-09 16:01:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \github\Nest.js-node\src\server\upload\upload.module.ts
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller'
import { UploadEntity } from './upload.entity';
@Module({
  imports:[TypeOrmModule.forFeature([UploadEntity])],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
