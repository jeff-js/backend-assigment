import { Module, forwardRef } from '@nestjs/common';
import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';
import { AgentModel } from './models/agent.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule } from '@nestjs/config';
import { IssuesModule } from 'src/issues/issues.module';

@Module({
  imports: [ConfigModule, TypegooseModule.forFeature([AgentModel]), forwardRef(() => IssuesModule)],
  controllers: [AgentsController],
  providers: [AgentsService],
  exports: [AgentsService]
})
export class AgentsModule {}
