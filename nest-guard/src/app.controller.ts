import { Controller, Get, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { EagonGuard } from './eagon-guard/eagon-guard.guard'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(EagonGuard)
  getHello(): string {
    return
  }
}
