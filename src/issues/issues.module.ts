import { Module, forwardRef } from '@nestjs/common';
import { IssuesController } from './issues.controller';
import { IssuesService } from './issues.service';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { IssueModel } from './models/issue.model';
import { ScheduleModule } from '@nestjs/schedule';
import { AgentsModule } from 'src/agents/agents.module';
@Module({
  imports: [ConfigModule, TypegooseModule.forFeature([IssueModel]), ScheduleModule.forRoot(), forwardRef(() => AgentsModule) ],
  controllers: [IssuesController],
  providers: [IssuesService],
  exports: [IssuesService]
})
export class IssuesModule {}
