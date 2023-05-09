import { ValidationPipe } from '@nestjs/common'
import { ValidationError } from 'class-validator'
// 重写ValidationPipe
// 目的 错误处理的结果可能不是想要的格式，或者每个返回的格式都要新增一个tag
// [
//   ValidationError {
//     target: UserDTO { password_confirmation: '1233' },
//     value: undefined,
//     property: 'name',
//     children: [],
//     constraints: { isNotEmpty: '用户名不能为空' }
//   }
// ]
// [
//   ValidationError {
//     target: UserDTO { password_confirmation: '1233' },
//     value: undefined,
//     property: 'password',
//     children: [],
//     constraints: { isNotEmpty: '密码不能为空' }
//   }
// ]
export class MyValidate extends ValidationPipe {
  protected mapChildrenToValidationErrors(error: ValidationError, parentPath?: string): ValidationError[] {
    const errors = super.mapChildrenToValidationErrors(error, parentPath)
    errors.map((error) => {
      Object.keys(error.constraints).forEach((key) => {
        error.constraints[key] = `${error.property} - ${error.constraints[key]} `
      })
    })
    return errors
  }
}
