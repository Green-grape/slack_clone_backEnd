import { Controller, Get, Post, Inject } from '@nestjs/common';
import { AppService } from './app.service';

//router
//req,res에 대해서 알고 있다.
@Controller('abc')
export class AppController {
  //provider에 미리 써두어야 타입 선언만해도 밑에서 쓸수 있다.
  //이렇게 하면 dependency injection이 되는데 이러면 provider만 약간 수정해줘도 nest가 알아서 매칭해주기 때문에 매우 좋다.
  //결합성을 낮춤
  constructor(
    private readonly appService: AppService,
    @Inject('CUSTOM_KEY') private readonly curtomValue, //key,value로 inject 해줌
  ) {}
  @Get('user') //GET /abc/user
  getHello(): string {
    return this.appService.getHello();
  }
}
