import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from 'src/dto/register.dto'
import LoginDTO from 'src/dto/login.dto'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { Auth } from 'src/Decorator/auth.decorator'

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterDto) {
    const state = await this.auth.register(data)
    return state
  }

  @Post('login')
  async login(@Body() data: LoginDTO) {
    const state = await this.auth.login(data)
    return state
  }

  @Get('findAll')
  @Auth()
  //Request belongs to express
  findAll(@Req() req: Request) {
    return this.auth.findAll()
  }
}
