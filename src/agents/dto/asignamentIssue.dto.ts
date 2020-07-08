import { IsString, IsNotEmpty } from 'class-validator';

export class AsignIssueDto {
  @IsNotEmpty()
  @IsString()
  readonly issueAsigned;
}
