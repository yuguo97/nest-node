/*
 * @Author: your name
 * @Date: 2021-03-18 15:38:13
 * @LastEditTime: 2021-04-10 14:30:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \github\login-node\src\users\users.service.ts
 */
import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { ICommonListContainer } from '../utils/tools/result';
import { UsersDao } from './users.dao';
import { RolesService } from '../roles/roles.service';
import { CryptoUtil } from '../utils/tools/crypto'
// import * as moment from 'moment';
// const { v4: uuidv4 } = require("uuid");
@Injectable()
export class UsersService {
  // 使用InjectRepository装饰器并引入Repository这样就可以使用typeorm的操作了
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    private readonly rolesService: RolesService,
    private readonly cryptoUtil: CryptoUtil,
  ) {}


  onModuleInit() {
    this.initUser();
  }


  private async initUser(): Promise<any> {

    const isExist = await this.userRepository.findOne({username: "admin"});
    if (!isExist) {
      const Role = await this.rolesService.getById(1)
      const Users = new UsersEntity();
      Users.username ="admin";
      Users.nickname = "超级管理员";
      Users.age = 18;
      Users.password = this.cryptoUtil.encryptPassword("123456");
      Users.avatar = "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif";
      Users.isSuper = 0;
      Users.role = Role;

      // await this.rolesRepository.save(Roles);
      await this.userRepository.save(Users);
    }
  }


  async findByUsername(username:string) {
    return await this.userRepository.findOne({username: username},{relations: ["role"]});
  }

  // 获取所有用户数据列表(userRepository.query()方法属于typeoram)
  async findAll(pageNum = 1, pageSize = 10,username = null): Promise<ICommonListContainer> {
    let qb:any;
    if(username){
      qb = this.userRepository.createQueryBuilder('UsersEntity').leftJoinAndSelect("UsersEntity.role", "role").where("UsersEntity.username = :username", { username: username })
    } else {
      qb = this.userRepository.createQueryBuilder('UsersEntity').leftJoinAndSelect("UsersEntity.role", "role")
    }
    qb = qb.skip(pageSize * (pageNum - 1)).take(pageSize)
    const total = await qb.getCount();
    const list = await qb.getMany();
    return {
      pageSize,
      pageNum,
      pages: Math.ceil(total / pageSize),
      total,
      list,
    };
  }

    // 根据管理id查询配置信息， 默认1
    async getById(id:number) {
      return await this.userRepository.findOne(id);
    }


    async add(obj: UsersDao) {
      const Role = await this.rolesService.getById(1)
      const Users = new UsersEntity();
      // Users.uuid = uuidv4();
      Users.username = obj.username || "";
      Users.nickname = obj.nickname;
      Users.age = obj.age;
      Users.password = this.cryptoUtil.encryptPassword(obj.password || "123456");
      Users.avatar = obj.avatar;
      Users.isSuper = obj.isSuper
      Users.role = Role;
      
      return await this.userRepository.save(Users);

    }


    async update(obj: UsersDao) {
      await this.userRepository.createQueryBuilder()
      .update('UsersEntity')
      .set({ username:obj.username,nickname:obj.nickname,age:obj.age,password:this.cryptoUtil.encryptPassword(obj.password)})
      .where("id = :id", { id: obj.id })
      .execute();
      // return []
  }
      // 删除配置信息
    async delete(id:number){
      return await this.userRepository.createQueryBuilder()
      .delete()
      .from('UsersEntity')
      .where("id = :id", { id: id })
      .execute()
    }
}
