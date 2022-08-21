import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { factoryLogger } from '@/utils/logger';

/**
 * @description: 实现一个异常过滤器，用于集中处理异常
 * @return {Object}
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    // 获取手动抛出的异常信息
    const res = exception.getResponse();
    const { message, error } = res as { message: string; error: string };
    const logger = factoryLogger();
    const errorMessage = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
      message,
    };
    logger.error(
      `${request.method} ${request.url}\n请求参数: ${JSON.stringify(
        request.body,
      )}\n请求结果: ${JSON.stringify(errorMessage)}`,
    );
    response.status(status).json(errorMessage);
  }
}
