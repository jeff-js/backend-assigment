import { Controller, Body, Post, Get } from '@nestjs/common';
import { IssueDto } from './dto/issue.dto';
import { IssuesService } from './issues.service';
import { IssueModel } from './models/issue.model';
@Controller('issues')
export class IssuesController {
  constructor(private readonly issueService: IssuesService) {}

  @Post()
  async createIssue(@Body() body: IssueDto): Promise<IssueModel> {
    return await this.issueService.create(body);
  }

  @Get()
  async getAllIssues(): Promise<any> {
    return await this.issueService.getAll();
  }
}
