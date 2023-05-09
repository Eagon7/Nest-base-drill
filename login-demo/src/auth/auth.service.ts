import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import registerDto from './dto/register.dto'
import { hash, verify } from 'argon2'
import loginDto from './dto/login.dto'
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async register(dto: registerDto) {
    const passwrod = await hash(dto.password)
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password: passwrod,
      },
    })
    delete user.password

    return user
  }
  async login(dto: loginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        name: dto.name,
      },
    })
    if (!verify(user.password, dto.password)) throw new BadRequestException('login failed')
    return 'login success'
  }
}
