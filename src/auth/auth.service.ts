/*
 * @Author: your name
 * @Date: 2021-03-25 15:29:37
 * @LastEditTime: 2021-04-07 18:02:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nestjs-node\src\server\auth\auth.service.ts
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MenusService } from '../menus/menus.service';
import { UsersService } from '../users/users.service';
import { CacheService } from '../cache/cache.service';
import { CryptoUtil } from '../utils/tools/crypto'
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly menusService: MenusService,
        private readonly usersService: UsersService,
        private readonly cacheService: CacheService,
        private readonly cryptoUtil: CryptoUtil,
    ) {}
    async findByUser(username:string) {
        return await this.usersService.findByUsername(username);
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (user && this.cryptoUtil.checkPassword(password,user.password)) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
    async login(user: any) {
        const data = {username: user.username, id: user.id};
        const token = this.jwtService.sign(data)
        await this.cacheService.setCache("token",token)
        return {
          loginUser: user,
          token: token,
        };
    }

    async fetchInfo(){
      const codes = await this.menusService.initInfo()
      const token = await this.cacheService.getCache("token")
      const user = await this.jwtService.verify(token)
      const userList = await this.usersService.findByUsername(user.username)
      const {password, ...result} = userList;
      const admin = userList.isSuper === 0?"admin":"editor"
      const data = {
        ...result,
        codes: [admin,...codes]
      }
      return data
    }


    async layout() {
      await this.cacheService.delCache("token")
  }
}