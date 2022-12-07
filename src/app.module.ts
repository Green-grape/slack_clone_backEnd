import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'; //dotenv 라이브러리 역할로 nest 공식 문서에 있다.
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

const getEnv = () => {
  return {
    SECRET: 'JUHO',
  };
};

//ConfigModule을 외부에서 불러올때는 load를 사용해서 함수형으로 불러오자. async 함수를 만들 수 있기 때문이다.
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [getEnv] }),
    WorkspacesModule,
    ChannelsModule,
    DmsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    { provide: 'CUSTOM_KEY', useValue: 'CUSTOM_VALUE' },
    UsersService,
  ],
  //providers:[
  //   {
  //     provide:AppService, -> 키값
  //     useClass:AppService, useValue, useFactory(class 만들기)등이 있다. ->실제값
  //   }
  // ]가 원래 providers의 원형이다.
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //모든 router에 loggerMiddleware 적용
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
