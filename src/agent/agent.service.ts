import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AgentDocument } from './schema/Agent.schema';

@Injectable()
export class AgentService {
  constructor(
    @InjectModel('Agent') private readonly agentModel: Model<AgentDocument>,
  ) {}

  create(createAgentDto: CreateAgentDto) {
    const { agencyID, commission, email, name, phone } = createAgentDto;

    const newAgent = new this.agentModel({
      agencyID,
      commission,
      email,
      name,
      phone,
    });

    return newAgent.save();
  }

  findAll() {
    return `This action returns all agent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agent`;
  }

  update(id: number, updateAgentDto: UpdateAgentDto) {
    return `This action updates a #${id} agent`;
  }

  remove(id: number) {
    return `This action removes a #${id} agent`;
  }
}
