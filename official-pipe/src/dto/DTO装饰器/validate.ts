import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator'

export function IsConfirmed(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    console.log(object, propertyName)
    registerDecorator({
      name: 'isConfirmed',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          // value 当前Decorator装饰的属性的值
          // args  http请求体所有参数
          // 123 {
          //   targetName: 'UserDTO',
          //   property: 'password',
          //   object: UserDTO { password: '123', password_confirmation: '123' },
          //   value: '123',
          //   constraints: undefined
          // }
          value == args.object['password_confirmation']
          return value == args.object[`${args.property}_confirmation`]
        },
        defaultMessage(validationArguments?: ValidationArguments) {
          return 'default message for Nestjs'
        },
      },
    })
  }
}
