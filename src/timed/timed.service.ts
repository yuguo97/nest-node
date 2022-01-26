import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimedEntity } from './timed.entity';
import { Cron, Interval, Timeout} from '@nestjs/schedule';
const os = require('os');


@Injectable()
export class TimedService {
    constructor(
        @InjectRepository(TimedEntity)
        private readonly timedRepository: Repository<TimedEntity>    
      ) {}


    onModuleInit() {
      this.initData()
    }

    initData(){
        const arch = os.arch();
        console.log("cpu架构："+arch);

        const kernel = os.type();
        console.log("操作系统内核："+kernel);

        const pf = os.platform();
        console.log("平台："+pf);

        const uptime = os.uptime();
        console.log("开机时间："+ uptime);

        const hn = os.hostname();
        console.log("主机名："+hn);

        const hdir = os.homedir();
        console.log("主目录："+hdir);

        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        console.log("内存大小："+totalMem+'空闲内存：'+freeMem);



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

    // @Interval(60000)
    // async handleInterval() {
    //     const totalMem = os.totalmem()
    //     const freeMem = os.freemem()
    //     console.log("内存大小："+totalMem+' 空闲内存：'+freeMem)
    //     const hn = os.hostname()

    //     const Timed = new TimedEntity()
    //     Timed.name = hn
    //     Timed.totalmem = totalMem
    //     Timed.freeMem = freeMem
    //     await this.timedRepository.save(Timed)
    // }


    // @Cron('45 * * * * *')
    // handleCron() {
    //     console.log('该方法将在45秒标记处每分钟运行一次');
    // }


    

    // @Timeout(5000)
    // handleTimeout() {
    //     const hn = os.hostname();
    //     console.log("主机名："+hn);
    // }

    // async getData(){
    // }


    onModuleDestroy() {
        console.log(`Cleanup...`);
    }
}
