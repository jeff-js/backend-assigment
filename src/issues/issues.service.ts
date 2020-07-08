import { Injectable, Logger, forwardRef, Inject } from '@nestjs/common';
import { IssueModel } from './models/issue.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, mongoose } from '@typegoose/typegoose';
import { IssueDto } from './dto/issue.dto';
import { Cron } from '@nestjs/schedule';
import { AgentsService } from 'src/agents/agents.service';


@Injectable()
export class IssuesService {

  private readonly logger = new Logger(IssuesService.name);

  constructor(
    @InjectModel(IssueModel)
    private readonly issueModel: ReturnModelType<typeof IssueModel>,
    @Inject(forwardRef(() => AgentsService))
    private readonly aggentService: AgentsService
  ) {}

  getAll = async (): Promise<any> => {
    return await this.issueModel.find();
  };

  create = async (body: IssueDto): Promise<IssueModel | null> => {
    const document = new this.issueModel(body);
    return await document.save();
  }; 

  asignIssue = async (idIssue:string, idUser:string): Promise<IssueModel | null> => {
    await this.aggentService.asignIssue(idUser, idIssue);
    return await this.issueModel.updateOne({_id: idIssue}, { asigned: true }, {new: false})
  };

  asignIssueManual = async (idIssue:string): Promise<IssueModel | null> => {
    return await this.issueModel.updateOne({_id: idIssue}, { asigned: true }, {new: false})
  };

  solveIssue = async (idIssue: string, idAgent: string): Promise<any> => {
    await this.issueModel.updateOne({_id: mongoose.Types.ObjectId(idIssue)}, {solve: true}, {new: false});
    await this.aggentService.unasignIssue(idAgent);
    const issueAvailable: any = await this.issueModel.findOne({solve: false, asigned: false});
    if(issueAvailable) {
      await this.aggentService.asignIssue(idAgent, issueAvailable._id);
      await this.issueModel.updateOne({_id: issueAvailable._id}, { asigned: true }, {new: false});
      return null;
    } else {
      return null;
    }
  }

  @Cron('60 * * * * *')
  async handleCronIssuesAssigned(): Promise<any> {
    const issuesAvailable: any = await this.issueModel.find({solve: false, asigned: false});
    for (const item of issuesAvailable){
      const agentAviable: any = await this.aggentService.getAgentAvailable();
      if(agentAviable) {
        await this.aggentService.asignIssue(agentAviable._id, item._id);
        await this.issueModel.updateOne({_id: item._id}, { asigned: true }, {new: false})
      }
    }

    this.logger.debug('Issues Assigned ');
  }
}
