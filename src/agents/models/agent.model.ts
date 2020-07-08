import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { IssueModel } from 'src/issues/models/issue.model';

@modelOptions({ schemaOptions: { collection: 'agents' } })
export class AgentModel extends TimeStamps {
  @prop({ required: true })
  name!: string;

  @prop({ ref: IssueModel })
  issueAsigned: Ref<IssueModel>;
}
