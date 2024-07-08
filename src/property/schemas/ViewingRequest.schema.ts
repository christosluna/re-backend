import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { Property } from './Property.schema';
import { Client } from '../../client/schemas/Client.schema';

export type ViewingRequestDocument = ViewingRequest & Document;

@Schema({
  timestamps: true,
})
export class ViewingRequest {
  @Prop({ required: true })
  agentId: string;

  @Prop({ required: true })
  property: Property;

  @Prop({ required: true })
  client: Client;

  @Prop({ required: true })
  preferredDate: Date;

  @Prop({ required: true })
  preferredTime: string;

  @Prop({ required: true })
  message: [];

  @Prop({ required: true })
  status: string;
}

export const ViewingRequestSchema =
  SchemaFactory.createForClass(ViewingRequest);
