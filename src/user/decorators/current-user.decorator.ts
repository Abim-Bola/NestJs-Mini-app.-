import { UseInterceptors, NestInterceptor, CallHandler, ExecutionContext, createParamDecorator } from "@nestjs/common";

/**
 * Custom decorator for getting current user. 
 */

export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest(); //Gives us underlying request coming to our application
        return request.currentUser
    }
)