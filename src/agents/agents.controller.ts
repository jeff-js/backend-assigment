import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentModel } from './models/agent.model';
import { AgentDto } from './dto/agent.dto';
import { AsignIssueDto } from './dto/asignamentIssue.dto';
import { IssuesService } from 'src/issues/issues.service';

@Controller('agents')
export class AgentsController {

  constructor(private readonly agentService: AgentsService, private readonly issuesService: IssuesService) {}

  @Post()
  async createAgent(@Body() body: AgentDto): Promise<AgentModel> {
    return await this.agentService.create(body);
  }

  @Get()
  async getAllAgents(): Promise<any> {
    return await this.agentService.getAll();
  }

  @Post('/:id/asign-issue')
  async asignIssue(@Param('id') agentId: string, @Body() body: AsignIssueDto): Promise<AgentModel> {
    return await this.agentService.asignIssue(agentId, body.issueAsigned);
  }

  @Post('/:id/solve-issue')
  async solveIssue(@Param('id') agentId: string, @Body() body: AsignIssueDto): Promise<AgentModel> {
    await this.issuesService.solveIssue(body.issueAsigned);
    return await this.agentService.unasignIssue(agentId);
  }

}
