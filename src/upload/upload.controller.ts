/*
 * @Author: your name
 * @Date: 2021-03-19 09:35:25
 * @LastEditTime: 2021-04-07 17:42:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \github\Nest.js-node\src\server\upload\upload.controller.ts
 */
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { IHttpData } from '../utils/tools/result';
import { UploadDao, UploadsDao } from './upload.dao';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('文件接口')
@Controller('upload')
@ApiResponse({
  status: 200,
  description: '查询成功',
  type: UploadsDao,
})
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseGuards(AuthGuard('jwt'))
  // 支持上传多个文件
  @ApiOperation({ summary: '上传文件，支持上传多个文件' })
  @Post()
  @UseInterceptors(FilesInterceptor('file')) // file对应HTML表单的name属性
  // swagger入参配置
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '选择文件',
    type: UploadDao,
  })
  async UploadedFile(@UploadedFiles() files: any): Promise<IHttpData> {
    // 接口严格要求以这个形式返回给前端
    const result: IHttpData = {
      code: 0,
      data: null,
      message: '',
      success: false,
    };
    // 若传入的文件为空，直接返回
    if (!files || files.length === 0) {
      result.code = -1;
      result.message = '未选择文件';
      return result;
    }
    // 调用service的存储文件方法，传入前端传来的文件数组
    // 成功后会将文件信息返回给前端
    const data = await this.uploadService.create(files);
    result.code = 200;
    result.data = data;
    result.message = '上传成功';
    result.success = true;
    // console.log(iconv.decode(files, 'gbk'))
    return result;
  }
}
