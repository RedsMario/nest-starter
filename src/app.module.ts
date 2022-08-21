import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'Joi';
import { LoggerMiddleware } from '@/common/middleware/logger.middleware';
import { EmailModule } from '@/modules/email/email.module';
import { getEnvFilePath } from '@/utils/get-env-file-path';
import { ExampleModule } from './modules/example/example.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      encoding: 'utf-8',
      envFilePath: [...getEnvFilePath()],
      expandVariables: true, // 开启嵌套变量
      ignoreEnvVars: true, // 忽略.env文件的读取
      load: [], // 加载环境变量的工厂函数,用于自定义加载环境变量
      validationSchema: Joi.object({
        SERVER_LISTEN_PORT: Joi.number().default(3000),
        SWAGGER_SETUP_PATH: Joi.string().default('api-docs'),
        SWAGGER_ENDPOINT_PREFIX: Joi.string().default('api/v1'),
        SWAGGER_UI_TITLE: Joi.string().default('Swagger文档标题'),
        SWAGGER_UI_DESCRIPTION: Joi.string().default('赶紧改相关配置啊~~'),
        SWAGGER_API_VERSION: Joi.string().default('1.0'),
        NODE_ENV: Joi.string().valid('development', 'production', 'test'),
      }),
      validationOptions: {
        allowUnknown: false, // 控制是否允许环境变量中未知的键。默认为true。
        abortEarly: true, // 如果为true，在遇到第一个错误时就停止验证；如果为false，返回所有错误。默认为false。
      },
    }),
    EmailModule,
    ExampleModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'hello', method: RequestMethod.GET })
      .forRoutes('/');
  }
}
