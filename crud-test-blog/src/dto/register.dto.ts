import { IsNotEmpty } from 'class-validator'
import { IsNotConfirmation } from '../rule/IsNotConfirmation.rule'
export class RegisterDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  user: string
  @IsNotConfirmation({ message: '确认密码不正确' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string
}
