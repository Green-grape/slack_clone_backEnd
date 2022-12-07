import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5501;
  await app.listen(port);
  console.log(`Server start on port ${port}`);
  //module hot reloading
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
