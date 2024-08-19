import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateReportDto } from '../report/dtos/create-report.dto'
import { ReportService } from './report.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';

@Controller('reports')
export class ReportController {
    constructor(private reportService: ReportService) {

    }
    @Post()
    @UseGuards(AuthGuard) //Ensures user is signed in
    @Serialize(ReportDto)
    async createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return await this.reportService.create(body, user)
    }

}
