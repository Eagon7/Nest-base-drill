import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator'
import { PrismaClient } from '@prisma/client'
export function confirmationRule(ValidationOptions: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'confirmatrionRule',
      target: object.constructor,
      propertyName: propertyName,
      options: ValidationOptions,
      validator: {
        async validate(value: string, args: ValidationArguments) {
          return value == args.object[`${args.property}_confirmation`]
        },
      },
    })
  }
}
