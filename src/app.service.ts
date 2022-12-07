import { Get, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

//요청과 응답에 대해서는 왠만하면 모르는게 좋음(req,res 매개변수 사용X)
//순수동작만(express와는 다르게 모든 함수에 대해서 req,res를 써줄 필요가 없다.)
//express와 다르게 강제적으로 동작과 req,res를 분리시킴
//express와는 다르게 return시 res.send, res.json등의 반복적인 과정을 생략하게 해준다.
@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  @Get()
  getHello() {
    return this.configService.get<string>('SECRET'); //=process.env.SECERT(nest가 관리할수 있게 바꿔주는 것)
  }
}
