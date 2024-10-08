import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
const cookieSession = require('cookie-session')

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // We dont have to import this module to other modules because it is global
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),

    TypeOrmModule.forRoot(),
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
  constructor(private configService: ConfigService) {

  }
  configure(consumer: MiddlewareConsumer) { //set up middleware to run on every incoming request
    consumer.apply(cookieSession({
      keys: [this.configService.get('COOKIE_KEY')] //Used to encrypt cookie - Should be stored in env
    })).forRoutes('*') //global middleware for all routes
  }
}
