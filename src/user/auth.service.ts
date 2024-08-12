import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import bcrypt from 'bcrypt'
import { randomBytes, scrypt as _scrypt } from 'crypto'
import { promisify } from 'util'
import { UserService } from './user.service';

const scrypt = promisify(_scrypt)
@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }


    async signup(email: string, password: string) {
        const users = await this.userService.find(email)
        if (users.length) {
            throw new BadRequestException('Email already exists')
        }

        const salt = randomBytes(8).toString('hex')
        const hash = (await scrypt(password, salt, 32)) as Buffer

        const result = salt + '.' + hash.toString('hex')
        const user = await this.userService.create(email, result)
        return user
    }

    async signin(email: string, password: string) {
        const [user] = await this.userService.find(email)
        if (!user) {
            throw new NotFoundException('User does not exist')
        }
        const [salt, storedHash] = user.password.split('.')
        const hash = await (scrypt(password, salt, 32)) as Buffer
        if (hash.toString('hex') !== storedHash) {
            throw new BadRequestException('Wrong password')
        }

        return user
    }

}
