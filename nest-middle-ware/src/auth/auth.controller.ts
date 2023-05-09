import { Controller, Get, NestModule } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get()
  findOne() {
    return 'auth';
  }
}
