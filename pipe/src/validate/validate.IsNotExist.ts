import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

//表字段是否唯一
export function IsConfirmedRule(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsConfirmedRule',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          console.log(args)
          return value == args.object[`${args.property}_confirmation`]
        },
      },
    })
  }
}

// target：被装饰的类的原型对象，如果装饰的是静态成员，则是该类本身。
// propertyKey：被装饰的成员的名字，如果装饰的是类本身，则是类的构造函数。
// descriptor：被装饰的成员的属性描述符，包括该成员的各种元数据信息，例如它是否可枚举、是否可写、是否可配置等。可以通过修改该对象来修改被装饰成员的行为。
