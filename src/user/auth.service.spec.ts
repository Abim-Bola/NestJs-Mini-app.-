import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { User } from './user.entity';


describe('AuthService', () => {
    let authService: AuthService;
    let fakeUserService: Partial<UserService>

    beforeEach(async () => {
        const users: User[] = []
        fakeUserService = {
            find: (email) => {
                const filteredUsers = users.filter((user) => user.email === email)
                return Promise.resolve(filteredUsers)
            },
            create: (email: string, password: string) => {
                const user = {
                    id: Math.floor(Math.random() * 999999),
                    email,
                    password
                } as User
                users.push(user)
                return Promise.resolve(user)
            }
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService, //This is the main service we want to test out
                {
                    provide: UserService, // This is the dependency within the Auth service
                    useValue: fakeUserService // We can mock the functions in userservice that Auth service is dependent on
                }
            ]
        }).compile();

        authService = module.get<AuthService>(AuthService);
    });

    it('Creates a new user', async () => {
        const user = await authService.signup('a@gmail.com', 'abimbola');
        expect(user.password).not.toEqual('abimbola')
        const [salt, hash] = user.password.split('.')
        expect(salt).toBeDefined();
        expect(hash).toBeDefined()

    });
    it('throws an error if user signs up with email that is in use', async () => {
        await authService.signup('asdf@asdf.com', 'asdf')
        await expect(authService.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
            BadRequestException,
        );
    });
    it('throws if signin is called with an unused email', async () => {
        await expect(
            authService.signin('asdflkj@asdlfkj.com', 'passdflkj'),
        ).rejects.toThrow(NotFoundException);
    });

    it('throws if an invalid password is provided', async () => {
        await authService.signup('laskdjf@alskdfj.com', 'passowrd'),
            await expect(
                authService.signin('laskdjf@alskdfj.com', 'password'),
            ).rejects.toThrow(BadRequestException);
    });

    it('returns a user if password is correct', async () => {
        const user = await authService.signup('a@gmail.com', 'abimbola');
        const signIn = await authService.signin('a@gmail.com', 'abimbola')

        expect(signIn).toBeDefined()
    });
})
