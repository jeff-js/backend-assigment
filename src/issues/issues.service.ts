import { Injectable } from '@nestjs/common';
import { IssueModel } from './models/issue.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, mongoose } from '@typegoose/typegoose';
import { IssueDto } from './dto/issue.dto';

@Injectable()
export class IssuesService {
  constructor(
    @InjectModel(IssueModel)
    private readonly issueModel: ReturnModelType<typeof IssueModel>,
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
}
