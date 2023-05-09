import { ValidateByOptions, ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator'

export function IsNotConfirmed(table: string, validateOptions: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsNotConfirmed',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table],
      options: validateOptions,
      validator: {
        async validate(value: string, args: ValidationArguments) {
          // value 当前Decorator装饰的属性的值
          // args  http请求体所有参数
          return value == args.object[`${args.property}_confirmation`]
        },
      },
    })
  }
}
