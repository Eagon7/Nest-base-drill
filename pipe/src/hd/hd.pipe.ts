import { ArgumentMetadata, BadRequestException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
@Injectable()
export class HdPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // value分配给 metadata.metaType 也就是 articleDto
    //前台提交的表单数据没有类型，使用 plainToClass 转为有类型的对象用于验证
    const object = plainToInstance(metadata.metatype, value)
    //根据 DTO 中的装饰器进行验证
    const error = await validate(object)
    if (error.length) {
      const message = error.map((item) => {
        return {
          name: item.property,
          value: Object.values(item.constraints),
        }
      })
      throw new BadRequestException(message, '123231')
    }
    return value
  }
}

// 打印前端传递过来的数据内容是object类型,接收数据需要符合声明参数的类型
// 所以我们需要对数据进行预处理,将数据转换成我们需要的类型。使用工具 class-transformer中的plainToInstance方法
