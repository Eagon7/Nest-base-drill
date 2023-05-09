import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common'
import { AppService } from './app.service'
import { RegisterDTO } from './dto/register'
import { Prisma, PrismaClient } from '@prisma/client'

@Controller()
export class AppController {
  psm = new PrismaClient()
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post('/test')
  async register(@Body() body: RegisterDTO) {
    return body
  }
}
