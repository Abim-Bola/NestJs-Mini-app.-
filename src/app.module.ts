import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { User } from './user/user.entity';
import { Report } from './report/report.entity';
const cookieSession = require('cookie-session')

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true, // Only used in dev env
    }),
    UserModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    }

  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) { //set up middleware to run on every incoming request
    consumer.apply(cookieSession({
      keys: ['heyabimbola'] //Used to encrypt cookie - Should be stored in env
    })).forRoutes('*') //global middleware for all routes
  }
}
