import { Body, Controller, Post, Get, Patch, Delete, Param, Query, NotFoundException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from './user.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';

@Serialize(UserDto)
@Controller('auth')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        const { email, password } = body;
        this.userService.create(email, password);
    }

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        console.log("handler running")
        const user = await this.userService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.userService.find(email);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(parseInt(id), body)
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id))
    }
}
