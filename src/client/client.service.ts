import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ViewMyRequestDto } from './dto/view-my-request.dto';

import { ClientDocument } from './schemas/Client.schema';
import { ViewingRequestDocument } from 'src/property/schemas/ViewingRequest.schema';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel('Client') private readonly clientModel: Model<ClientDocument>,
    @InjectModel('ViewingRequest')
    private readonly viewingRequestModel: Model<ViewingRequestDocument>,
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

  async viewMyRequests(payload: ViewMyRequestDto) {
    let result;
    const { clientId } = payload;

    if (clientId) {
      result = await this.viewingRequestModel
        .find({ 'client._id': clientId })
        .exec();
    } else {
      result = await this.viewingRequestModel.find();
    }

    return result;
  }
}
