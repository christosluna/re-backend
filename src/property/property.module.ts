import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';

import { PropertySchema } from './schemas/Property.schema';
import { ViewingRequestSchema } from './schemas/ViewingRequest.schema';
import { ClientSchema } from 'src/client/schemas/Client.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Property', schema: PropertySchema },
      { name: 'ViewingRequest', schema: ViewingRequestSchema },
      { name: 'Client', schema: ClientSchema },
    ]),
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
  exports: [PropertyService],
})
export class PropertyModule {}
