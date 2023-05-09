import { BadRequestException, Injectable, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { user } from '@prisma/client'
import { hash, verify } from 'argon2'
import LoginDTO from 'src/dto/login.dto'
import { RegisterDto } from 'src/dto/register.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(private psm: PrismaService, private jwt: JwtService) {}

  async register(dto: RegisterDto) {
    const result = await this.psm.user.create({
      data: {
        user: dto.user,
        password: await hash(dto.password), // hash the password (argon2)
        password_confirmation: await hash(dto.password_confirmation),
      },
    })
    return this.token(result)
  }

  async login(dto: LoginDTO) {
    const foundUser = await this.psm.user.findUnique({
      where: {
        user: dto.user,
      },
    })
    if (!(await verify(foundUser.password, dto.password))) throw new BadRequestException('Wrong password')
    return this.token(foundUser)
  }

  async findAll() {
    return await this.psm.user.findMany()
  }

  async token({ user, id }: user) {
    return {
      token: await this.jwt.signAsync({
        user,
        sub: id,
      }),
    }
  }
}
