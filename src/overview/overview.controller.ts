import { Controller } from '@nestjs/common';
import { OverviewService } from './overview.service';
import { Get } from '@nestjs/common';
@Controller('overview')
export class OverviewController {
  constructor(private overviewService: OverviewService) {}

  @Get('')
  getOverview() {
    return this.overviewService.getOverview();
  }
}
