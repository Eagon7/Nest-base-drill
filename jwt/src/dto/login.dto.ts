import { IsNotEmpty } from 'class-validator'

export default class LoginDTO {
  @IsNotEmpty({ message: '用户名不能为空' })
  user: string
  @IsNotEmpty({ message: '密码不能为空' })
  password: string
}
