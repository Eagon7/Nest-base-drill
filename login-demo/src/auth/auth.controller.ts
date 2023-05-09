import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import registerDto from './dto/register.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import loginDto from './dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Post('register')
  register(@Body() dto: registerDto) {
    return this.auth.register(dto)
  }

  @Post('login')
  async login(@Body() dto: loginDto) {
    const result = await this.auth.login(dto)
    return result
  }
}
