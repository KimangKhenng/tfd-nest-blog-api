import { Module } from '@nestjs/common';

import { CourseBot } from './course-bot';

@Module({
  providers: [CourseBot],
})
export class BotModule {}
