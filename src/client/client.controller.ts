import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ClientService } from './client.service';

import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtAuthGuard } from 'src/_core/guard/auth-jwt.guard';
import { ViewingRequestComment } from 'src/property/dto/view-request-comment.dto';
import { PropertyService } from 'src/property/property.service';
import { CreateViewRequestDto } from 'src/property/dto/view-request.dto';

@Controller('client')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly propertyService: PropertyService,
  ) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }

  @Get('me/requests')
  @UseGuards(JwtAuthGuard)
  viewMyRequests(@Query('id') clientId: string) {
    return this.clientService.viewMyRequests({ clientId });
  }

  @Post('request/viewing')
  @UseGuards(JwtAuthGuard)
  requestPropertyViewing(@Body() createViewRequestDto: CreateViewRequestDto) {
    return this.propertyService.requestPropertyViewing(createViewRequestDto);
  }
}
