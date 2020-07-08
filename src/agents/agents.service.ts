import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, mongoose } from '@typegoose/typegoose';
import { AgentModel } from './models/agent.model';
import { AgentDto } from './dto/agent.dto';


@Injectable()
export class AgentsService {
  constructor(
    @InjectModel(AgentModel)
    private readonly agentModel: ReturnModelType<typeof AgentModel>,
  ) {}

  getAll = async (): Promise<AgentModel[] | null> => {
    return await this.agentModel.find();
  };

  create = async (body: AgentDto): Promise<AgentModel | null> => {
    const document = new this.agentModel(body);
    return await document.save();
  };

  asignIssue = async (id: string, issueId: string): Promise<any> => {
    return await this.agentModel.updateOne({_id: mongoose.Types.ObjectId(id)},{ issueAsigned:  mongoose.Types.ObjectId(issueId)}, { new: false })
  }

  unasignIssue = async (id:string) : Promise<any> => {
    return await this.agentModel.updateOne({_id: mongoose.Types.ObjectId(id)}, {$unset: {issueAsigned: 1 }}, {new: false})
  }
}
