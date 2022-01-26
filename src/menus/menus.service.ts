import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { MenusEntity } from './menus.entity';
// const { v4: uuidv4 } = require("uuid");
import { menusDao } from './menus.dao';
@Injectable()
export class MenusService {
    constructor(
        @InjectRepository(MenusEntity)
        private readonly menuRepository: Repository<MenusEntity>,
    ) { }

    onModuleInit() {
        this.initMenu()
     }

     private async initMenu(): Promise<void> {
        const MenuList: any[] = [
            {
                name: '系统管理',
                pid: 0,
                url: 'system/management',
                code: "system:management",
                order: 6,
                icon: ""
            },
            {
                name: '用户管理',
                url: 'system/user/index',
                pid: 1,
                code: "system:user:index",
                order: 3,
                icon: ""
            },
            {
                name: '菜单管理',
                url: 'system/menu/index',
                pid: 1,
                code: "system:menu:index",
                order: 4,
                icon: ""
            },
            {
                name: '角色管理',
                url: 'system/role/index',
                pid: 1,
                code: "system:role:index",
                order: 5,
                icon: ""
            },
        ]
        const isExist = await this.menuRepository.count();
        if (!isExist) {
            await this.menuRepository.insert(MenuList);
        }
     }

    async findAll(){
        const arr = await this.menuRepository.find();

        if(!Array.isArray(arr) || !arr.length) return;

        let map = {};
        arr.forEach(item => map[item.id] = item);
    
        let data = [];
        arr.forEach(item => {
            const parent = map[item.pid];
            if(parent){
                (parent.children || (parent.children=[])).push(item);
            }
            else{
                data.push(item);
            }
        })

        return data
    }

    async add(obj: menusDao) {
        const MenusData = new MenusEntity();
        MenusData.name = obj.name || "";
        MenusData.url = obj.url || "";
        MenusData.code = obj.url.split("/").join(":") || "";
        MenusData.order = obj.order || 0;
        MenusData.icon = obj.icon || "";
        MenusData.pid = obj.pid || 0;
        const saveResult = await this.menuRepository.save(MenusData)

        return saveResult
    }
    async update(obj: menusDao) {
        await this.menuRepository.createQueryBuilder()
        .update('MenusEntity')
        .set({ name:obj.name,url:obj.url,order:obj.order,icon:obj.icon,pid:obj.pid})
        .where("id = :id", { id: obj.id })
        .execute();
        // return []
    }

    async delete(id:number) {
        await this.menuRepository.createQueryBuilder()
        .delete()
        .from('MenusEntity')
        .where("id = :id", { id: id })
        .execute()
      }

    async initInfo(){
        const arr = await this.menuRepository.find();
        const data = arr.map(item=>{
            return item.code
        })
        return data
    }
}
