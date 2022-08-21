import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmailService } from '@/modules/email/email.service';
import { SendEmailRequest } from '@/modules/email/dto/send-email-request';
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  // @Post()
  // async sendEmail(@Body() email: SendEmailRequest) {
  //   return this.userService.sendEmail(email);
  // }
  @Get()
  async testEmail() {
    return this.emailService.testEmail();
  }
  @Post()
  async getUser(@Body() data: SendEmailRequest) {
    return this.emailService.sendEmail(data);
  }
}
