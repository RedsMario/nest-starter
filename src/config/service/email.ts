import { join } from 'path';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { registerAs } from '@nestjs/config';
// 提交
export default registerAs('email', () => ({
  // 第一种方式 smtps://user:pass@host:port
  transport: 'smtps://2818908400@qq.com:qtdtksximmejdhej@smtp.qq.com',
  // 第二种方式
  // transport: {
  //   host: 'smtp.qq.com', //邮箱服务器地址
  //   port: 465, //服务器端口 默认 465
  //   auth: {
  //     user: '2818908400@qq.com', // 你的邮箱地址
  //     pass: 'qtdtksximmejdhej', // qq邮箱的校验码
  //   },
  // },
  preview: true, //是否开启预览，开启了这个属性，在调试模式下会自动打开一个网页，预览邮件
  defaults: {
    from: 'nest-modules',
  },
  template: {
    dir: join(__dirname, './templates'),
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
}));
