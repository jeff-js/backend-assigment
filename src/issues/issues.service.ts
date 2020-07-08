import { Injectable, Logger } from '@nestjs/common';
import { IssueModel } from './models/issue.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, mongoose } from '@typegoose/typegoose';
import { IssueDto } from './dto/issue.dto';
import { Cron } from '@nestjs/schedule';
import { AgentsService } from 'src/agents/agents.service';
import { AgentModel } from 'src/agents/models/agent.model';


@Injectable()
export class IssuesService {

  private readonly logger = new Logger(IssuesService.name);

  constructor(
    @InjectModel(IssueModel)
    private readonly issueModel: ReturnModelType<typeof IssueModel>,
    private readonly aggentService: AgentsService
  ) {}

  getAll = async (): Promise<any> => {
    return await this.issueModel.find();
  };

  create = async (body: IssueDto): Promise<IssueModel | null> => {
    const document = new this.issueModel(body);
    return await document.save();
  };

  solveIssue = async (idIssue: string): Promise<IssueModel | null> => {
    return await this.issueModel.updateOne({_id: mongoose.Types.ObjectId(idIssue)}, {solve: true}, {new: false});
  }

  @Cron('30 * * * * *')
  async handleCronIssuesAssigned(): Promise<any> {
    const issuesAvailable: any = await this.issueModel.find({solve: false, asigned: false});
    for (const item of issuesAvailable){
      const agentAviable: any = await this.aggentService.getAgentAvailable();
      await this.aggentService.asignIssue(agentAviable._id, item._id);
      await this.issueModel.updateOne({_id: item._id}, { asigned: true }, {new: false})
    }

    this.logger.debug('Issues Assigned ');
  }
}
