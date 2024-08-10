import { Body, Controller, Post, Get, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UserController {
    constructor(public userService: UserService) { }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        console.log(body);
    }

    @Get()
    findUser() {
    }
    @Get()
    findAllUsers() { }

    @Patch()
    updateUser() { }
    @Delete()
    removeUser() { }
}
