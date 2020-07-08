import { modelOptions, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({ schemaOptions: { collection: 'issues' } })
export class IssueModel extends TimeStamps {
  @prop({ required: true })
  reportData!: string;

  @prop({ required: true, default: false })
  solve!: boolean;
}
