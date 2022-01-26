/*
 * @Author: your name
 * @Date: 2021-03-18 13:49:28
 * @LastEditTime: 2021-04-11 11:08:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \github\login-node\src\app.module.ts
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { MenusModule } from './menus/menus.module';
import { CacheModule } from './cache/cache.module';
import { RolesModule } from './roles/roles.module'
import { TimedModule } from './timed/timed.module'
import { TaskModule } from './task/task.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost", 
      "port": 3306, 
      "username": "root", 
      "password": "123456", 
      "database": "yuguo", 
      "entities": ["dist/**/**.entity{.ts,.js}"],
      "timezone": "UTC",
      "charset": "utf8mb4",
      "multipleStatements": false,
      "dropSchema": false,
      "synchronize": true, 
      "logging": false
    }),
    UsersModule,
    UploadModule,
    AuthModule,
    MenusModule,
    CacheModule,
    RolesModule,
    TimedModule,
    TaskModule
  ],
})
export class AppModule {}
