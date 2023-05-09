import { Type } from 'class-transformer'
import { IsNotEmpty, ValidateIf } from 'class-validator'
import { IsConfirmedRule } from 'src/validate/validate.IsNotExist'
export class CreateUserDTO {
  @IsNotEmpty({ message: '$property:用户名不能为空' })
  name: string

  //存在price时才验证
  @ValidateIf((o) => o.price)
  //将类型转换为数值
  @Type(() => Number)
  price: number
}
