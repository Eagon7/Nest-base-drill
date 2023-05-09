import { IsNotEmpty } from 'class-validator'
import { extend, partial } from 'lodash'
import { PartialType } from '@nestjs/mapped-types'
import registerDto from './register.dto'
import { loginUserIsNotExist } from 'src/rule/loginUserIsNotExist.rule'
export default class loginDto extends PartialType(registerDto) {
  @loginUserIsNotExist('user', { message: 'name is not exist' })
  name: string
}
// Partial
