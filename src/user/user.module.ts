import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core'; // Used to set interceptors globally
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, AuthService, CurrentUserInterceptor, { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor }]
})
export class UserModule { }
