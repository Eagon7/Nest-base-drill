import { IsNotEmpty } from 'class-validator'
import { IsNotExist } from 'src/rule/IsNotExist.rule'
import { IsNotConfirmed } from 'src/rule/IsNotconfirmed.rule'

export class RegisterDTO {
  // @IsNotEmpty({ message: '用户名不能为空' })
  @IsNotExist('user', { message: '用户名已存在' })
  name: string

  @IsNotEmpty({ message: '密码不能为空' })
  @IsNotConfirmed('user', { message: '两次密码不一致' })
  password: string
}
