import { Controller, Body, Post, Get, Res, HttpStatus } from '@nestjs/common';
import { IssueDto } from './dto/issue.dto';
import { IssuesService } from './issues.service';
import { Response } from 'express';

@Controller('issues')
export class IssuesController {
  constructor(private readonly issueService: IssuesService) {}

  @Post()
  async createIssue(
    @Body() body: IssueDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const issueCreated = await await this.issueService.create(body);
      return res
        .status(HttpStatus.OK)
        .json({ success: true, message: 'Creación OK', data: issueCreated });
    } catch (error) {
      return res.status(HttpStatus.OK).json({
        success: false,
        message: 'Ha ocurrido un error al ejecutar la operacion',
      });
    }
  }

  @Get()
  async getAllIssues(): Promise<any> {
    return await this.issueService.getAll();
  }
}
