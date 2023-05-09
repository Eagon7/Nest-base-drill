import { Body, Controller, Post } from '@nestjs/common'
import { RegisterDTO } from 'src/dto/register'

@Controller('auth')
export class AuthController {
  /**
   * 请求的生命周期
   * 1. 全局绑定的中间件 2. 局部中间件
   * 3. 全局守卫 4. 控制层守卫 5. 路由守卫
   * -控制器之前- 6. 全局拦截器 7. 控制层拦截器 8. 路由拦截器
   * 9. 管道 10. 控制层管道 11. 路由管道 12. 路由参数管道
   * 13. 控制器（方法处理器）
   * 14. 路由拦截器（请求之后)
   * 15. 控制器拦截器（请求之后）
   * 16. 全局拦截器（请求之后）
   * 17. 异常过滤器（路由之后是控制器，之后是全局）
   * 18. 服务器响应
   * */
  @Post('register')
  register(@Body() body: RegisterDTO) {
    return body
  }
}
