import { Injectable, NotFoundException } from '@nestjs/common';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/user/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';


@Injectable()
export class ReportService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) { //Allows us access the repository 

    }
    async create(reportDto: CreateReportDto, user: User) {
        const createReport = this.repo.create(reportDto)
        createReport.user = user
        return await this.repo.save(createReport)
    }

    async changeApproval(id: string, approved: boolean, user: User) {
        const report = await this.repo.findOne({ where: { id: parseInt(id) } });

        if (!report) {
            throw new NotFoundException('Report not found')
        }
        report.approved = approved
        report.user = user
        const saveReport = await this.repo.save(report)
        return saveReport
    }
    async createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
        return this.repo.createQueryBuilder('reports')
            .select('AVG(price)', 'price')
            .where('make = :make', { make })
            .andWhere('model = :model', { model })
            .andWhere('lng = :lng BETWEEN -5 AND 5', { lng })
            .andWhere('lat = :lat BETWEEN -5 AND 5', { lat })
            .andWhere('year = :year BETWEEN -3 AND 3', { year })
            .andWhere('approved IS TRUE')
            .orderBy('ABS(mileage - :mileage)', 'DESC')
            .setParameters({ mileage })
            .limit(3)
            .getRawOne()
    }
}
