import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MyValidate } from './my-validate-pipe/my-validate'
import { ValidateExceptionFilter } from './validate-exception/validate-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new MyValidate())
  // 全局异常过滤器
  app.useGlobalFilters(new ValidateExceptionFilter())
  // officialPipe
  // 他是一个js类，可以通过new来创建实例.我们也可以继承它，然后重写里面的方法
  // 注册管道验证规则
  await app.listen(3310)
}
bootstrap()
