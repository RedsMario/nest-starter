import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SendEmailRequest } from '@/modules/email/dto/send-email-request';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  private readonly users: any[] = [];
  constructor(
    @Inject('ADMIN_SERVER') private readonly client: ClientProxy,
    private readonly mailerService: MailerService,
  ) {}

  testEmail() {
    this.mailerService.sendMail({
      to: 'marioworker@163.com',
      from: '2818908400@qq.com',
      subject: 'I am a test email',
      template: 'welcome',
      // html: '<b>welcome</b>',
    });
  }
  // sendEmail(email: SendEmailRequest) {
  //   this.users.push(email);
  //   this.client.emit('send_email', email);
  // }

  sendEmail(data: SendEmailRequest) {
    const d = new Date();
    return this.client.send(
      { cmd: 'get_user' },
      {
        ...data,
        date: `${d.getFullYear()}-${
          d.getMonth() + 1
        }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
      },
    );
  }
}
