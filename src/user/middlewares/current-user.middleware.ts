import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UserService } from '../user.service';
import { User } from "../user.entity";

/**
 * Modifies the Request type definition to allow us add more properties to it such as User to avoid typescripts error being thrown
 */
declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
        }
    }
}
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(
        private userService: UserService
    ) { }
    async use(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.session || {}

        if (userId) {
            const user = await this.userService.findOne(userId)

            req.currentUser = user
        }
        next();
    }
}