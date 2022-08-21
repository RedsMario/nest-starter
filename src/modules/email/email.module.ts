import { Module } from '@nestjs/common';
import { EmailController } from '@/modules/email/email.controller';
import { EmailService } from '@/modules/email/email.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import EmailConfig from '@/config/service/email';
@Module({
  imports: [
    // 加载邮件配置
    ConfigModule.forRoot({
      load: [EmailConfig],
    }),
    MailerModule.forRootAsync({
      // 必须导入ConfigModule
      imports: [ConfigModule],
      // 读取配置
      useFactory: (config: ConfigService) => config.get('email'),
      // 注入ConfigService
      inject: [ConfigService],
    }),
    ClientsModule.register([
      {
        name: 'ADMIN_SERVER',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'admin_queue',
          queueOptions: {
            durable: false, //消息持久化
          },
        },
      },
    ]),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
