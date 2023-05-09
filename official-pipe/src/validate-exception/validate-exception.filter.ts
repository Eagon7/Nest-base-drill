import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
// 异常过滤器
// 请求异常，返回的是一个html页面，我们需要将其转换为json格式

@Catch()
export class ValidateExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = host.switchToHttp().getResponse()
    if (exception instanceof BadRequestException) {
      const responseObject = exception.getResponse()
      return response.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.UNPROCESSABLE_ENTITY,
        message: responseObject['message'].map((item) => {
          const info = item.split('-')
          return { name: info[0], message: info[1] }
        }),
      })
    }
    return response
  }
}
