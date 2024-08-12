import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { plainToClass } from "class-transformer";
import { UserService } from "../user.service";



@Injectable() //Allows class to make use of DI
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService: UserService) {
        this.userService = userService
    }

    async intercept(context: ExecutionContext, handler: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const { userId } = request.session || {}
        if (userId) {
            const user = await this.userService.findOne(userId)
            request.currentUser = user
        }

        return handler.handle()
    }
}