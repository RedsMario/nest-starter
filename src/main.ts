import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '@/app.module';
import { startApp } from '@/utils/start';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import { ValidationPipe } from '@/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  // 设置全局路由前缀
  app.setGlobalPrefix(process.env.SWAGGER_ENDPOINT_PREFIX);
  // 设置全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 设置全局验证管道
  app.useGlobalPipes(new ValidationPipe());
  // 注册 swagger
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_UI_TITLE)
    .setDescription(process.env.SWAGGER_UI_DESCRIPTION)
    .setVersion(process.env.SWAGGER_API_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.SWAGGER_SETUP_PATH, app, document);
  await app.listen(3000);
  // 打印服务启动信息
  startApp();
}
bootstrap();
