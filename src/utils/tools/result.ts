/*
 * @Author: your name
 * @Date: 2021-03-19 09:32:54
 * @LastEditTime: 2021-03-19 17:11:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \github\Nest.js-node\src\utils\result.ts
 */
import { ApiProperty } from '@nestjs/swagger';
export interface IHttp<T = any> {
  header: any;
  config: any;
  request: any;
  data: {
    code: number;
    message: string;
    data: T | null;
  };
}
export interface IHttpData<T = any> {
  code: number;
  message: string;
  data: T;
  success: Boolean;
}

export type IHttpResult<T> = Promise<IHttp<T>>;

export interface ICommonListContainer<T = any> {
  list: T[];
  pageNum: number;
  pageSize: number;
  pages: number;
  total: number;
}

export interface IRulesItem {
  required?: boolean;
  message?: string;
  trigger?: 'change' | 'blur';
  min?: number;
  max?: number;
  type?: 'array' | 'date' | 'string' | 'number';
  validator?: (
    rule: IRulesItem,
    value: string | number,
    cb: (error?: Error) => void,
  ) => void;
}

export type IRules = { [key: string]: IRulesItem[] };

export class Reluct {
  code: number;
  data: any;
  message: string;
  success: Boolean;
  constructor(
    code: number = 0,
    data: any = null,
    message: string = '',
    success: Boolean = false,
  ) {
    this.code = code;
    this.data = data;
    this.message = message;
    this.success = success;
  }
}

export class ReluctFull<T = any> {
  @ApiProperty({ description: '返回数据' })
  data: T;
  @ApiProperty({ description: '状态码' })
  code: number;
  @ApiProperty({ description: '消息' })
  message: string;
}
