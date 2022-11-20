import { Ctx, Hears, On, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { MESSAGE_HEAD } from '../type/payment-message';
import { Public } from '../../common/decorator/public.decorator';
import { TelegrafContextInterface } from '../../common/context/telegraf-context.interface';

@Update()
export class CourseBot {
  @Public()
  @On('text')
  async hears(@Ctx() ctx: TelegrafContextInterface) {
    if (ctx.message.from.username === 'PayWayByABA_bot') {
      console.log('Valid Payment is Made');
    }
  }

  // @On('text')
  // async on(@Ctx() ctx: Context) {
  //   await ctx.reply('👍');
  // }
}
