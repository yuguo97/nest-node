/*
 * @Author: your name
 * @Date: 2021-03-22 11:31:39
 * @LastEditTime: 2021-03-22 11:31:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \github\Nest.js-node\src\common\middleware\logger.middleware.ts
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { method, path } = req;
    console.log(`${method} ${path} ${JSON.stringify(res)}`);
    next();
  }
}

export function logger(req: Request, res: Response, next: NextFunction) {
  const { method, path } = req;
  console.log(`${method} ${path}`);
  next();
};