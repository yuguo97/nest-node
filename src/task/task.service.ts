import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { CacheService } from '../cache/cache.service';
const os = require('os');

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
        private readonly cacheService: CacheService, 
      ) {}

    onModuleInit() {
        this.initData()
    }

    initData(){
        const arch = os.arch();
        console.log("cpu架构："+arch);
        this.cacheService.setCache("arch",arch)

        const kernel = os.type();
        console.log("操作系统内核："+kernel);
        this.cacheService.setCache("kernel",kernel)

        const pf = os.platform();
        console.log("平台："+pf);
        this.cacheService.setCache("pf",pf)

        const uptime = os.uptime();
        console.log("开机时间："+ uptime);
        this.cacheService.setCache("uptime",uptime)

        const hn = os.hostname();
        console.log("主机名："+hn);
        this.cacheService.setCache("hn",hn)

        const hdir = os.homedir();
        console.log("主目录："+hdir);
        this.cacheService.setCache("hdir",hdir)

        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        console.log("内存大小："+totalMem+'空闲内存：'+freeMem);
        this.cacheService.setCache("totalMem",totalMem)
        this.cacheService.setCache("freeMem",freeMem)

        console.log('*****cpu信息*******');
        const cpus = os.cpus();
        cpus.forEach((cpu:any,idx:any,arr:any)=>{
            var times = cpu.times;
            console.log(`cpu${idx}：`);
            console.log(`型号：${cpu.model}`);
            console.log(`频率：${cpu.speed}MHz`);
            console.log(`使用率：${((1-times.idle/(times.idle+times.user+times.nice+times.sys+times.irq))*100).toFixed(2)}%`);
        });


        console.log('*****网卡信息*******');
        const networksObj = os.networkInterfaces();
        for(let nw in networksObj){
            let objArr = networksObj[nw];
            console.log(`\r\n${nw}：`);
            objArr.forEach((obj:any,idx:any,arr:any)=>{
                console.log(`地址：${obj.address}`);
                console.log(`掩码：${obj.netmask}`);
                console.log(`物理地址：${obj.mac}`);
                console.log(`协议族：${obj.family}`);
            });
        }
    }

}
