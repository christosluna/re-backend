import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ClientDocument = Client & Document;

@Schema({
  timestamps: true,
})
export class Client {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  budget: string;

  @Prop({ required: true })
  minBedrooms: string;

  @Prop({ required: true })
  minBathrooms: string;

  @Prop({ required: true })
  minArea: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
