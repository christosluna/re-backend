import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type AgencyDocument = Agency & Document;

@Schema({
  timestamps: true,
})
export class Agency {
  @Prop({ required: true })
  agentID: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  phone: string;
}

export const AgencySchema = SchemaFactory.createForClass(Agency);
