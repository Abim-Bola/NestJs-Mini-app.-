import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Report } from '../report/report.entity';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password: string;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[]

    @Column({ default: true })
    admin: boolean

    @Column()
    email: string
}