import { PrismaClient } from '@prisma/client'
import { ValidationOptions, registerDecorator } from 'class-validator'

export function IsNotExits(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotExits',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        async validate(value: any, args: any) {
          const psm = new PrismaClient()
          const a = await psm.user.findFirst({
            where: {
              [args.property]: args.object[args.property],
            },
          })
          return !Boolean(a)
        },
      },
    })
  }
}
