import { IsString, IsNotEmpty } from 'class-validator';

export class AgentDto {
  @IsNotEmpty()
  @IsString()
  readonly name;
}
