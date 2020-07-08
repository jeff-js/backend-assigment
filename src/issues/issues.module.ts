import { Module } from '@nestjs/common';
import { IssuesController } from './issues.controller';
import { IssuesService } from './issues.service';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { IssueModel } from './models/issue.model';

@Module({
  imports: [ConfigModule, TypegooseModule.forFeature([IssueModel])],
  controllers: [IssuesController],
  providers: [IssuesService],
  exports: [IssuesService]
})
export class IssuesModule {}
