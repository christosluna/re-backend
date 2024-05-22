import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ClientDocument } from './Schema/Client.schema';

import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel('Client') private readonly clientModel: Model<ClientDocument>,
  ) {}

  create(createClientDto: CreateClientDto) {
    const { budget, email, minArea, minBathrooms, minBedrooms, name, phone } =
      createClientDto;

    const newClient = new this.clientModel({
      name,
      email,
      phone,
      budget,
      minBedrooms,
      minBathrooms,
      minArea,
    });

    return newClient.save();
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
