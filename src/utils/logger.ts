/* eslint-disable prettier/prettier */
import { configure, getLogger } from 'log4js';

export const factoryLogger = () => {
  configure({
    appenders: {
      // 输出到日志文件
      error: {
        type: 'file',
        filename: 'error.log',
        layout: {
          // 配置日志输出格式及样式
          type: 'pattern',
          pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] %c  - %m',
        },
      },
      // 输出到控制台
      consoleout: {
        type: 'console',
        layout: {
          // 配置日志输出格式及样式
          type: 'pattern',
          pattern: '%[[%d{yyyy-MM-dd hh:mm:ss}] [%p] %c %] - %m',
        },
      },
    },
    categories: {
      // 默认分类
      default: {
        appenders: ['error', 'consoleout'],
        // 输出的日志将等于或高于此级别
        level: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
      },
    },
  });
  return getLogger();
};
