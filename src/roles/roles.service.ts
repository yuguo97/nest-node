import { Injectable } from '@nestjs/common';
import { RolesEntity } from './roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesDao } from './roles.dao';
@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(RolesEntity)
        private readonly roleRepository: Repository<RolesEntity>    
      ) {}
      
      onModuleInit() {
        this.initRole();
      }

      async initRole(): Promise<any> {
        const isExist = await this.roleRepository.findOne({ident: "000"});
        if (!isExist) {
            const Roles = new RolesEntity();
            Roles.name = "系统管理员"
            Roles.ident = "000"
            Roles.description ="这是系统管理员"
            await this.roleRepository.save(Roles)
          }
      }

      async getById(id:number) {
        return await this.roleRepository.findOne(id);
      }

      async findByUsername(name:string){
        return await this.roleRepository.findOne({name})
      }

      async find() {
        return await this.roleRepository.find();
      }

      async add(obj: RolesDao) {
        const Roles = new RolesEntity();
        Roles.name = obj.name || "";
        Roles.ident = obj.ident || "";
        Roles.description = obj.description || "";
        return await this.roleRepository.save(Roles);
      }

      async update(obj: RolesDao){
        await this.roleRepository.createQueryBuilder()
        .update('RolesEntity')
        .set({ name:obj.name,ident:obj.ident,description:obj.description})
        .where("id = :id", { id: obj.id })
        .execute();
      }

      async delete(id:number){
        await this.roleRepository.createQueryBuilder()
        .delete()
        .from('RolesEntity')
        .where("id = :id", { id: id })
        .execute()
      }
}
