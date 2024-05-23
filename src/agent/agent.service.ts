import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AgentDocument } from './schema/Agent.schema';
import { ViewRequestDto } from './dto/view-requests.dto';
import { ViewingRequestDocument } from 'src/property/schemas/ViewingRequest.schema';

@Injectable()
export class AgentService {
  constructor(
    @InjectModel('Agent') private readonly agentModel: Model<AgentDocument>,
    @InjectModel('ViewingRequest')
    private readonly viewRequestModel: Model<ViewingRequestDocument>,
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

  viewRequests(viewRequestDto: ViewRequestDto) {
    const { agentId } = viewRequestDto;

    const viewRequests = this.viewRequestModel.find({
      agentId: agentId,
    });

    return viewRequests;
  }
}
