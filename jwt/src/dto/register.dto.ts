import { IsNotEmpty } from 'class-validator'
import { confirmationRule } from 'src/rule/confirmation.rule'
export class RegisterDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  user: string

  @confirmationRule({ message: '两次密码不一致' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string

  @IsNotEmpty({ message: '确认密码不能为空' })
  password_confirmation: string
}
