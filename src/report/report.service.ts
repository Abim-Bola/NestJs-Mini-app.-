import { Injectable } from '@nestjs/common';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/user/user.entity';


@Injectable()
export class ReportService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) { //Allows us access the repository 

    }
    async create(reportDto: CreateReportDto, user: User) {
        const createReport = this.repo.create(reportDto)
        createReport.user = user
        return await this.repo.save(createReport)
    }
}
