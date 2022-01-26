import { CacheController } from './cache.controller';
import { CacheService } from './cache.service';
import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis'
const options={
  port: 6379,
  host: '127.0.0.1',
  password: '123456',
  // db: 0
}
@Module({
  imports: [
    RedisModule.register(options)
  ],
  controllers: [CacheController],
  providers: [CacheService],
  exports: [CacheService]
})
export class CacheModule {}
