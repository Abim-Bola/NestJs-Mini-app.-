import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm'
import { User } from '../user/user.entity'

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    price: number


    @Column()
    make: string

    @Column()
    model: string

    @ManyToOne(() => User, (user) => { user.reports }) //Takes in instance of user
    user: User

    @Column()
    mileage: number

    @Column()
    year: number

    @Column()
    lng: number

    @Column()
    lat: number
}