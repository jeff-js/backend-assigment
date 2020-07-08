import { IsString, IsNotEmpty } from 'class-validator';

export class IssueDto {
  @IsNotEmpty()
  @IsString()
  readonly reportData;
}
