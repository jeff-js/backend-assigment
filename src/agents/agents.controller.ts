import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentDto } from './dto/agent.dto';
import { AsignIssueDto } from './dto/asignamentIssue.dto';
import { IssuesService } from 'src/issues/issues.service';
import { Response } from 'express';

@Controller('agents')
export class AgentsController {
  constructor(
    private readonly agentService: AgentsService,
    private readonly issuesService: IssuesService,
  ) {}

  @Post()
  async createAgent(
    @Body() body: AgentDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const agent = await this.agentService.create(body);
      return res
        .status(HttpStatus.OK)
        .json({ success: true, message: 'Creación exitosa', data: agent });
    } catch (error) {
      return res.status(HttpStatus.OK).json({
        success: false,
        message: 'Ha ocurrido un error al ejecutar la operacion',
      });
    }
  }

  @Get()
  async getAllAgents(): Promise<any> {
    return await this.agentService.getAll();
  }

  @Post('/:id/asign-issue')
  async asignIssue(
    @Param('id') agentId: string,
    @Body() body: AsignIssueDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      await this.agentService.asignIssue(agentId, body.issueAsigned);
      return res
        .status(HttpStatus.OK)
        .json({ success: true, message: 'Asignación OK' });
    } catch (error) {
      return res.status(HttpStatus.OK).json({
        success: false,
        message: 'Ha ocurrido un error al ejecutar la operacion',
      });
    }
  }

  @Post('/:id/solve-issue')
  async solveIssue(
    @Param('id') agentId: string,
    @Body() body: AsignIssueDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      console.log('object');
      await this.issuesService.solveIssue(body.issueAsigned, agentId);

      return res
        .status(HttpStatus.OK)
        .json({ success: true, message: 'Asignación OK' });
    } catch (error) {
      return res.status(HttpStatus.OK).json({
        success: false,
        message: 'Ha ocurrido un error al ejecutar la operacion',
      });
    }
  }
}
