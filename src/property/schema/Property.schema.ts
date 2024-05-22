import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type PropertyDocument = Property & Document;

@Schema({
  timestamps: true,
})
export class Property {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  propertyType: string;

  @Prop({ required: true })
  agentID: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  bedrooms: string;

  @Prop({ required: true })
  bathrooms: string;

  @Prop({ required: true })
  area: string;

  @Prop({ required: true })
  description: string;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
