import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from '../modules/common/interceptor/timeout.interceptor';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../modules/auth/jwt-guard';
import { CommonModule } from '../modules/common/common.module';
import { AuthModule } from '../modules/auth/auth.module';
import { RolesGuard } from '../modules/common/guard/roles.guard';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { ThrottlerModule } from '@nestjs/throttler';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { MailmanModule } from '@squareboat/nest-mailman';
import {
  bullConfig,
  mailMainConfig,
  redisConfig,
  throttlerConfig,
  typeormConfig,
} from '../modules/common/config';
import { join } from 'path';
import { FileModule } from '../modules/file/file.module';
import { CourseModule } from '../modules/course/course.module';
import { UserAuthModule } from '../modules/user-auth/user-auth.module';
import { PurchaseModule } from '../modules/purchase/purchase.module';
import { UserModule } from '../modules/user/user.module';
import { CategoryModule } from '../modules/category/category.module';
import { ChapterModule } from '../modules/chapter/chapter.module';
import { InstructorModule } from '../modules/instructor/instructor.module';
import { CourseManagementModule } from '../modules/course-management/course-management.module';
import { UserOwnManagementModule } from '../modules/user-own-management/user-own-management.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      ignoreEnvFile:
        process.env.NODE_ENV === 'beta' || process.env.NODE_ENV === 'staging',
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: bullConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeormConfig,
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: redisConfig,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: throttlerConfig,
    }),
    MailmanModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: mailMainConfig,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'kh',
      loaderOptions: {
        path: join(__dirname, './../i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    AuthModule,
    UserModule,
    FileModule,
    CourseModule,
    ChapterModule,
    PurchaseModule,
    UserAuthModule,
    CategoryModule,
    CommonModule,
    InstructorModule,
    CourseManagementModule,
    UserOwnManagementModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule {}
