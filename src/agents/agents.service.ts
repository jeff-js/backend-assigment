import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, mongoose } from '@typegoose/typegoose';
import { AgentModel } from './models/agent.model';
import { AgentDto } from './dto/agent.dto';
import { IssuesService } from 'src/issues/issues.service';


@Injectable()
export class AgentsService {
  constructor(
    @InjectModel(AgentModel)
    private readonly agentModel: ReturnModelType<typeof AgentModel>,
    @Inject(forwardRef(() => IssuesService))
    private readonly issueService: IssuesService
  ) {}

  getAll = async (): Promise<AgentModel[] | null> => {
    return await this.agentModel.find();
  };

  getAgentAvailable = async (): Promise<AgentModel | null> => {
    return await this.agentModel.findOne({issueAsigned: { $exists: false }})
  };

  create = async (body: AgentDto): Promise<AgentModel | null> => {
    const document = new this.agentModel(body);
    return await document.save();
  };

  asignIssue = async (id: string, issueId: string): Promise<any> => {
    await this.agentModel.updateOne({_id: mongoose.Types.ObjectId(id)},{ issueAsigned:  mongoose.Types.ObjectId(issueId)}, { new: false })
    await this.issueService.asignIssueManual(issueId);
    return null;
  }

  unasignIssue = async (id:string) : Promise<any> => {
    return await this.agentModel.updateOne({_id: mongoose.Types.ObjectId(id)}, {$unset: {issueAsigned: 1 }}, {new: false})
  }
}
