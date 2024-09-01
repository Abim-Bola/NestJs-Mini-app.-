import { CanActivate, ExecutionContext } from '@nestjs/common'


/**
 * This is for checking that the user is an admin user. Used to authorize requests to resources. 
 */
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        if (!request.currentUser) {
            return false
        }
        return request.currentUser.admin
    }

}