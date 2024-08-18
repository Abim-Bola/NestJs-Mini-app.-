import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { User } from './user.entity';

describe('UserController', () => {
  let controller: UserController;
  let fakeUserService: Partial<UserService>
  let fakeAuthService: Partial<AuthService>

  beforeEach(async () => {

    fakeUserService = {
      findOne: (id: number) => {
        return Promise.resolve({ id: 9, email: 'a@gmai.com', password: 'a' })
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'a' }])
      },
      // remove: (id: number) => {
      //   return Promise.resolve([{ id: 1, email: 'a@gmai.com', password: 'a' } as User])
      // },
      // update: () => { }
    }

    fakeAuthService = {
      // signup: () => { },
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User)
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService
        },
        {
          provide: UserService,
          useValue: fakeUserService
        }
      ]

    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findUser throws an error if user with given id is not found', async () => {
    fakeUserService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  })

  it('find users with given email', async () => {
    const users = await controller.findAllUsers('a@gmai.com')
    expect(users.length).toEqual(1)
    expect(users[0].email).toEqual('a@gmai.com')
  })

  it('find user with given id', async () => {
    const user = await controller.findUser('1')
    expect(user).toBeDefined()
  })


  it('signin updates session object and returns user', async () => {
    const session = {
      userId: -10
    }
    const user = await controller.signin({ email: 'a@gmail.com', password: 'a' }, session)

    expect(user.id).toEqual(1)
    expect(session.userId).toEqual(1)
  })
});
