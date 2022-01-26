/*
 * @Author: your name
 * @Date: 2021-03-19 09:36:39
 * @LastEditTime: 2021-03-22 14:16:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \github\Nest.js-node\src\server\upload\upload.service.ts
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadEntity } from './upload.entity';
import { Repository } from 'typeorm';
import { join } from 'path';
import * as fs from 'fs';
import * as moment from 'moment';
import { mkdirp } from 'mz-modules';
@Injectable()
export class UploadService {
     // 使用InjectRepository装饰器并引入Repository这样就可以使用typeorm的操作了
  constructor(
    @InjectRepository(UploadEntity)
    private readonly uploadRepository: Repository<UploadEntity>,
  ) {}

  async findAll(): Promise<UploadEntity[]> {
    return await this.uploadRepository.find();
  }

    // 存储文件
    async create(files: Array<any>) {
        const fileArr = [];
        for (const file of files) {
          // 文件类型为img则存储img文件夹，否则存在file文件夹
          const file_type = file.mimetype;
          const imgReg = /image/gi;
          // 文件夹，判断是图片还是其他文件
          const upload_dir_type = imgReg.test(file_type) ? 'img' : 'file';
          // 当天日期
          const today = moment().format('YYYY-MM-DD');
          // 相对路径
          const relative_dir_path = `/static/${upload_dir_type}/${today}/`;
          // 生成本地路径
          const target_dir_path = join(__dirname, '../../..', relative_dir_path);
          // 若是没有某天的文件夹，mkdirp会创建出该文件夹
          await mkdirp(target_dir_path);
          // 文件相对路径
          let file_path = relative_dir_path + file.originalname;
          // 文件本地路径
          let target_file_path = target_dir_path + file.originalname;
          let clientID = '';
          // 判断文件夹中是否已经存在该文件，只有重复的文件才会执行这一步
          // 若是已经存在，会随机生成一个id，然后拼接到文件名的前面
          const pathBool = await fs.existsSync(target_file_path);
          if (pathBool) {
            // clientID 随机生成一个8位数的id
            const possible =
              'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 8; i++) {
              clientID += possible.charAt((Math.random() * possible.length) | 0);
            }
            file_path = relative_dir_path + clientID + file.originalname;
            target_file_path = target_dir_path + clientID + file.originalname;
          }
          // 存储文件
          const writeMusicCover = fs.createWriteStream(target_file_path);
          writeMusicCover.write(file.buffer);
          // 存数据库
          const uploadData = new UploadEntity();
          uploadData.name = pathBool
            ? clientID + file.originalname
            : file.originalname;
          uploadData.type = upload_dir_type;
          uploadData.path = file_path;
          uploadData.pathLocal = target_file_path;
          // http://node.wisdoms.xin域名根据自己的来
          uploadData.pathUrl = 'http://127.0.0.1:8989' + file_path;
          uploadData.size = file.size;
          uploadData.createTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
          await this.uploadRepository.save(uploadData);
          // 删除是为了不将这几个参数返回给前端
          delete uploadData.pathLocal;
          delete uploadData.type;
          fileArr.push(uploadData);
        }
        // 单个文件直接返回对象，多个文件会返回数组
        return files.length > 1 ? fileArr : fileArr[0];
      }
}
