import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { AgentSchema } from './schema/Agent.schema';
import { ViewingRequestSchema } from 'src/property/schemas/ViewingRequest.schema';
import { PropertyModule } from 'src/property/property.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Agent', schema: AgentSchema },
      { name: 'ViewingRequest', schema: ViewingRequestSchema },
    ]),
    PropertyModule,
  ],
  controllers: [AgentController],
  providers: [AgentService],
  exports: [AgentService],
})
export class AgentModule {}
