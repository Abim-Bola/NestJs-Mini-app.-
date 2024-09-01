import { Controller, Post, Body, UseGuards, Param, Patch, Get, Query } from '@nestjs/common';
import { CreateReportDto } from '../report/dtos/create-report.dto'
import { ReportService } from './report.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportController {
    constructor(private reportService: ReportService) {

    }
    @Post()
    @Serialize(ReportDto)
    @UseGuards(AuthGuard) // Ensures user is signed in
    async createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        const report = await this.reportService.create(body, user)
        return report
    }

    @Patch('/:id')
    @Serialize(ReportDto)
    @UseGuards(AdminGuard)
    async approveReport(@Param('id') id: string, @Body() body: ApproveReportDto, @CurrentUser() user: User) {
        const { approved } = body
        return await this.reportService.changeApproval(id, approved, user)
    }

    @Get()
    async getEstimate(@Query() query: GetEstimateDto, @CurrentUser() user: User) {
        return await this.reportService.createEstimate(query)
    }

}
