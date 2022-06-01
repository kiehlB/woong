import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import * as cookieParser from 'cookie-parser';
const prod = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.enableCors();

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new TimeoutInterceptor(), new LoggingInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(PORT);
  Logger.log(`Server running on http://localhost:${PORT}`, 'Bootstrap');
}
bootstrap();
