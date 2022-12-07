import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

//실무일때 nestjs-logger를 따로 사용해보자
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  //HTTP는 context(context를 만들어서 console.log끼리 구분되게 한다.), express의 debug
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction): void {
    //1번
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    //res.on은 비동기라서 나중에 실행이 된다. 3번
    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      //console.log 대신 logger.log 사용
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    //2번
    next();
  }
}
