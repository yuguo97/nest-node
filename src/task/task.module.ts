import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { CacheModule } from '../cache/cache.module';
@Module({
  imports:[
    TypeOrmModule.forFeature([TaskEntity]),
    CacheModule
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
