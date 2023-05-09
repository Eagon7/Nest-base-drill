import { Body, Controller, Post } from '@nestjs/common'
import { RegisterDto } from 'src/dto/register.dto'
import { AuthService } from './auth.service'
import { LoginDTO } from 'src/dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.AuthService.register(dto)
  }

  @Post('login')
  login(@Body() dto: LoginDTO) {
    
    console.log(dto)
    return dto
  }
}
