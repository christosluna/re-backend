import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

import { PropertyDocument } from './schema/Property.schema';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel('Property')
    private readonly propertyModel: Model<PropertyDocument>,
  ) {}

  create(payload: CreatePropertyDto) {
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

    return newProperty.save();
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
}
