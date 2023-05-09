import { PrismaClient } from '@prisma/client'
import { ValidateByOptions, ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator'

export function loginUserIsNotExist(table: string, validateOptions: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'loginUserIsNotExist',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table],
      options: validateOptions,
      validator: {
        async validate(value: string, args: ValidationArguments) {
          const psm = new PrismaClient()
          const result = await psm[table].findFirst({
            where: {
              [propertyName]: value,
            },
          })
          console.log(result)
          return Boolean(result)
        },
      },
    })
  }
}
