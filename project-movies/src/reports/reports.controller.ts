import { Controller } from '@nestjs/common';
import { ReportsService } from './reports.service';
import * as schedule from 'node-schedule';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  job = schedule.scheduleJob('*/2 * * * *', async () => {
    const createReportDto = await this.reportsService.generateReport();
    this.reportsService.create(createReportDto);
  });
}
