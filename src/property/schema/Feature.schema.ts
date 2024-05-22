import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type FeatureDocument = Feature & Document;

@Schema({
  timestamps: true,
})
export class Feature {
  @Prop({ required: true })
  propertyID: string;

  @Prop({ required: true })
  featureName: string;

  @Prop({ required: true })
  value: string;
}

export const FeatureSchema = SchemaFactory.createForClass(Feature);
