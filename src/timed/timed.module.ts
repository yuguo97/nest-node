import { Module } from '@nestjs/common';
import { TimedEntity } from './timed.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimedService } from './timed.service';
import { TimedController } from './timed.controller';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
    imports:[
        TypeOrmModule.forFeature([TimedEntity]),
        ScheduleModule.forRoot()
    ],
    providers: [TimedService],
    controllers: [TimedController],
    exports: [TimedService]
})
export class TimedModule {}
