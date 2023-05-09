import { IsNotEmpty, Length } from 'class-validator'
import { IsConfirmedRule } from 'src/validate/validate.IsNotExist'

export default class AtricleDto {
  @IsNotEmpty({ message: '标题不能为空' })
  @Length(1, 10, { message: '标题长度为1-10' })
  title: string
  @IsNotEmpty({ message: '内容不能为空' })
  @IsConfirmedRule({ message: '内容必须和确认内容一致' })
  content: string
}
// plainToInstance()方法可以将对象转换成我们需要的类型,并且比对，不符合的则返回当前的规则
// 最后通过validate验证会判断数据是否一致 不一致则抛出错误

/**
 * @IsNotEmpty({ message: '标题不能为空' })
 * title: string
 * 最终会被转变为
 * article:{
 *  title:{
 *    rule:['isNotEmpty']
 *  }
 * }
 * 最后通过validate验证会判断数据是否一致 不一致则抛出错误
 */
/**
 * 最后通过switch循环进行判断
 * switch(rule){
 *  case 'isNotEmpty':
 *   throw new BadRequestException('标题不能为空')
 *  break
 * case 'isString':
 *  throw new BadRequestException('标题必须是字符串')
 * break
 *
 * }
 */
