import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({
  timestamps: true,
})
export class Transaction {
  @Prop({ required: true })
  propertyID: string;

  @Prop({ required: true })
  clientID: string;

  @Prop({ required: true })
  agentID: string;

  @Prop({ required: true })
  transactionStatus: string;

  @Prop({ required: true })
  transactionDate: string;

  @Prop({ required: true })
  amount: string;

  @Prop({ required: true })
  status: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
