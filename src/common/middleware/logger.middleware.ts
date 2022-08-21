import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { factoryLogger } from '@/utils/logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, path } = req;
    const logger = factoryLogger();
    logger.debug(`${method} ${path}`);
    next();
  }
}
