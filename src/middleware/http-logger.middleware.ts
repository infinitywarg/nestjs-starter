import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HTTPLogger implements NestMiddleware {
  private logger = new Logger(`HTTP`);
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `${req.method} ${req.originalUrl} | ${JSON.stringify(
        req.body,
      )} ${JSON.stringify(req.query)} | ${res.statusCode}`,
    );
    next();
  }
}
