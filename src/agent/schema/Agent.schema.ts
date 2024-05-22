import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type AgentDocument = Agent & Document;

@Schema({
  timestamps: true,
})
export class Agent {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  agencyID: string;

  @Prop({ required: true })
  commission: string;
}

export const AgentSchema = SchemaFactory.createForClass(Agent);
