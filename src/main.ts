/*
 * @Author: your name
 * @Date: 2021-03-18 13:49:28
 * @LastEditTime: 2021-04-08 14:09:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \github\login-node\src\main.ts
 */
const common = require("@nestjs/common");
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AllExceptionsFilter } from './utils/global/filters/http-exception.filter';
import {SwaggerModule,DocumentBuilder} from '@nestjs/swagger';
import * as serveStatic from 'serve-static'
import { join } from 'path';
import { logger } from './utils/global/middleware/logger.middleware'
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

 // 全局使用中间件
  app.use(logger)
  // 处理跨域
  app.enableCors();

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  // 设置所有 api 访问前缀
  app.setGlobalPrefix('/api')

// Web漏洞的
  app.use(helmet());
  
  //处理异常
  app.useGlobalFilters(new AllExceptionsFilter());

  // '/public' 是路由名称，即你访问的路径为：host/public
  // serveStatic 为 serve-static 导入的中间件，其中'../public' 为本项目相对于src目录的绝对地址
  app.use(
    '/static',
    serveStatic(join(__dirname, '../static'), {
      maxAge: '1d',
      extensions: ['jpg', 'jpeg', 'png', 'gif', 'mp4'],
    }),
  );


  app.use(compression());
  // swagger配置
  const options = new DocumentBuilder()
  .setTitle('Nestjs后台管理API')
  .setDescription('供后台管理界面调用的服务端API')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document, {
    swaggerOptions: {
      docExpansion: 'none'
    }
  });
  
  await app.listen(8989,()=>{
    common.Logger.log(`服务已经启动,接口地址请访问:http://localhost:8989/api`);
  });
}
bootstrap();
