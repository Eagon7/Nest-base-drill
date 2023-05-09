import { Body, Controller, DefaultValuePipe, Get, Param, Post, UsePipes } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { AppService } from './app.service'
import AtricleDto from './dto/atricle.dto'
import { ValidatePipe } from './validate/validate.pipe'
import { CreateUserDTO } from './dto/create.user.dto'
@Controller()
export class AppController {
  psm: PrismaClient
  constructor(private readonly appService: AppService) {
    this.psm = new PrismaClient()
  }

  @Get('a')
  getall() {
    return '123'
  }

  @Get(':id')
  // @UsePipes(new HdPipe())
  async getHello(@Param('id', new DefaultValuePipe(1)) id: number) {
    return await this.psm.article.findUnique({
      where: {
        id,
      },
    })
  }

  @Post('store')
  async add(@Body() dto: AtricleDto) {
    const result = await this.psm.article.create({
      data: {
        title: dto.title,
        content: dto.content,
      },
    })
    return '添加成功'
  }

  @Post('user')
  @UsePipes(new ValidatePipe())
  async addUser(@Body() dto: CreateUserDTO) {
    return dto
  }
}
// 管道的作用是对数据进行预处理
// 数据先走管道，再走控制器，最后走服务
// 管道会提取控制类的参数信息 metadata
// metadata 包含了参数的类型、请求类型、参数的名称
// { metatype: [Function: Number], type: 'param', data: 'id' }
// 还会提取http传递过来的参数值 value

//管道可以放到参数中 也可以放到@Get()下
//@Param('id',new HdPipe()

// 也可以作为装饰器修饰控制器 会对当前所有的路由生效
/**
 * @UsePipes(new HdPipe())
 * @Controller()
 * export class AppController {}
 */

// 还可以作为提供者放到全局对全局的路由生效
/**
 * @Module({
 *  imports: [],
 * controllers: [AppController],
 * providers: [
 * AppService,
 * {
 * provide: 'APP_PIPE',
 * useClass: HdPipe,
 * },
 *
 */
// 名称必须为APP_PIPE

// 还可以写到入口文件里对全局路由生效
/**
 * app.use(new HdPipe())
 */
