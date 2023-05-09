import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HdPipe } from './hd/hd.pipe'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    // module使用管道
    // {
    //   provide: 'APP_PIPE',
    //   useClass: HdPipe,
    // },
  ],
})
export class AppModule {}
