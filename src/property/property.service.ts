import { Model } from 'mongoose';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { CreateViewRequestDto } from './dto/view-request.dto';
import { ViewingRequestComment } from './dto/view-request-comment.dto';

import { PropertyDocument } from './schemas/Property.schema';
import { ClientDocument } from '../client/schemas/Client.schema';
import { ViewingRequestDocument } from './schemas/ViewingRequest.schema';
import { ImageDocument } from './schemas/Image.schema';

import { diskStorage } from 'multer';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel('Property')
    private readonly propertyModel: Model<PropertyDocument>,
    @InjectModel('ViewingRequest')
    private readonly viewingRequestModel: Model<ViewingRequestDocument>,
    @InjectModel('Client')
    private readonly clientModel: Model<ClientDocument>,
    @InjectModel('Image')
    private readonly imageModel: Model<ImageDocument>,
  ) {}

  createProperty(payload: CreatePropertyDto, filePath?: any) {
    const {
      address,
      agentID,
      area,
      bathrooms,
      bedrooms,
      city,
      description,
      price,
      propertyType,
    } = payload;

    const newProperty = new this.propertyModel({
      address,
      city,
      propertyType,
      agentID,
      price,
      bedrooms,
      bathrooms,
      area,
      description,
    });

    newProperty.save();

    console.log('filePath', filePath);
    const propertyImage = new this.imageModel({
      propertyID: newProperty.id,
      path: filePath,
    });

    propertyImage.save();

    return newProperty;
  }

  uplodadImage(propertyID, filePath) {
    new this.imageModel({
      propertyID: propertyID,
      path: filePath,
    }).save();
  }

  findAll() {
    const properties = this.propertyModel.find({});
    return properties;
  }

  findOne(id: string) {
    const property = this.propertyModel.findById({ _id: id });
    return property;
  }

  update(id: string, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: string) {
    return `This action removes a #${id} property`;
  }

  async createFeature() {}

  async requestPropertyViewing(payload: CreateViewRequestDto) {
    const {
      agentId,
      clientId,
      propertyId,
      preferredDate,
      preferredTime,
      message,
    } = payload;

    const property = await this.propertyModel.findById({ _id: propertyId });
    const client = await this.clientModel.findById({ _id: clientId });

    const existingRequest = await this.viewingRequestModel
      .findOne({ 'client._id': clientId, 'property._id': propertyId, agentId })
      .exec();

    if (existingRequest)
      throw new NotAcceptableException('Requested already on this property');

    const newViewRequest = new this.viewingRequestModel({
      agentId,
      client,
      property,
      preferredDate,
      preferredTime,
      message: { message, date: new Date(), user: 'client' },
      status: 'PENDING',
    });

    return newViewRequest.save();
  }

  async messageViewingRequest(payload: ViewingRequestComment) {
    const { agentId, clientId, propertyId, message, userType } = payload;

    const newMessage = {
      message,
      date: new Date(),
      userType,
    };

    await this.viewingRequestModel
      .updateOne(
        {
          'client._id': clientId,
          'property._id': propertyId,
          agentId,
        },
        { $push: { message: newMessage } },
      )
      .exec();

    return { message: 'Comment saved' };
  }
}
