import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class CacheService {    
    public client:any;
    constructor(private redisService: RedisService) {
        this.getClient();
    }
    async getClient() {
        this.client = await this.redisService.getClient()
    }

    //设置值的方法
    async setCache(key:string, value:any, seconds?:number) {
        value = JSON.stringify(value);
        if(!this.client){
            await this.getClient();
        }
        if (!seconds) {
            await this.client.set(key, value);
        } else {
            await this.client.set(key, value, 'EX', seconds);
        }
    }

    //获取值的方法
    async getCache(key:string) {
        if(!this.client){
            await this.getClient();
        }
        const data = await this.client.get(key);           
        if (!data) return;
        return JSON.parse(data);       
    }


    //获取值的方法
    async delCache(key:string) {
        if(!this.client){
            await this.getClient();
        }
        const data = await this.client.del(key);           
        if (!data) return;
        return JSON.parse(data);       
    }

    
}