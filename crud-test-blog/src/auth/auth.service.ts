import { BadRequestException, Injectable } from '@nestjs/common'
import { user } from '@prisma/client'
import { hash, verify } from 'argon2'
import { LoginDTO } from 'src/dto/login.dto'
import { RegisterDto } from 'src/dto/register.dto'
import { PrismaService } from 'src/prisma/prisma.service'

// argon2 单纯密码存储数据库加密
// jwt 根据头部信息，传递信息,用户id 只是单纯的对信息进行一个签名而不是加密.
// 如果client 传递过来的token可以通过服务端的签名认证，那么就可以认为是合法的
@Injectable()
export class AuthService {
  constructor(private psm: PrismaService) {}

  async register(dto: RegisterDto) {
    return await this.psm.user.create({
      data: {
        user: dto.user,
        passwrod: await hash(dto.password),
      },
    })
  }

  async login(dto: LoginDTO) {
    const result = await this.psm.user.findUnique({
      where: {
        user: dto.user,
      },
    })
    if (!(await verify(dto.password, result.passwrod))) throw new BadRequestException('密码不正确')
    return await this.token(result)
  }

  async token({ user, id }: user) {
    return {
      // token:
    }
  }
}
