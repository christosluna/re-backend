import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { JwtAuthGuard } from 'src/_core/guard/auth-jwt.guard';
import { PropertyService } from 'src/property/property.service';
import { CreateViewRequestDto } from 'src/property/dto/view-request.dto';
import { RolesGuard } from 'src/_core/guard/roles.guard';
import { ViewingRequestComment } from 'src/property/dto/view-request-comment.dto';

@Controller('agent')
export class AgentController {
  constructor(
    private readonly agentService: AgentService,
    private readonly propertyService: PropertyService,
  ) {}

  @Post()
  create(@Body() createAgentDto: CreateAgentDto) {
    return this.agentService.create(createAgentDto);
  }

  @Get()
  findAll() {
    return this.agentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgentDto: UpdateAgentDto) {
    return this.agentService.update(+id, updateAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentService.remove(+id);
  }

  @Get('view/requests/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  getViewRequests(@Param('id') agentId: string) {
    return this.agentService.viewRequests({ agentId });
  }

  @Post('message/request')
  @UseGuards(JwtAuthGuard, RolesGuard)
  messageViewingRequest(@Body() viewingRequestComment: ViewingRequestComment) {
    return this.propertyService.messageViewingRequest(viewingRequestComment);
  }
}
