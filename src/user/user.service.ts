import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { NotFoundError } from 'rxjs';
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    create(email: string, password: string) {
        const user = this.repo.create({ email, password });
        return this.repo.save(user);
    }

    findOne(id: number) {
        const findUser = this.repo.findOneBy({ id })
        return findUser
    }

    find(email: string) {
        return this.repo.find({ where: { email } })
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id)
        if (!user) {
            throw new NotFoundException('User not found')
        }
        Object.assign(user, attrs) // Overwrites properties in other obj
        return this.repo.save(user)
    }

    async remove(id: number) {
        const user = await this.repo.findOneBy({ id })
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return this.repo.remove(user)
    }
}
