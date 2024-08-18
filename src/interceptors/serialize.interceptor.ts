import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { UserDto } from "../user/dtos/user.dto";
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { plainToClass } from "class-transformer";


interface ClassConstructor { //This is to add a type to ensure what is passed is always a class
    new(...args: any[]): {}
}
export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(UserDto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {
        this.dto = dto
    }

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        // Run something before a request is handled
        return handler.handle().pipe(
            map((data: any) => {
                //run something before this data is sent out 
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true //Essential to exposing values when instance is converted to json
                })
            })
        )
    }
}