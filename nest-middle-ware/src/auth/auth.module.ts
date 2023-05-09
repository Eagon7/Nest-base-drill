import {
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
} from '@nestjs/common';
import { LoggerMiddleWareMiddleware } from 'src/logger-middle-ware/logger-middle-ware.middleware';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWareMiddleware).forRoutes('/auth');
  }
}
