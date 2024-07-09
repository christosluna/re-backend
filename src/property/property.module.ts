import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';

import { PropertySchema } from './schemas/Property.schema';
import { ViewingRequestSchema } from './schemas/ViewingRequest.schema';
import { ClientSchema } from '../client/schemas/Client.schema';
import { JwtStrategy } from '../_core/guard/jwt.strategy';
import { ImageSchema } from './schemas/Image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Property', schema: PropertySchema },
      { name: 'ViewingRequest', schema: ViewingRequestSchema },
      { name: 'Client', schema: ClientSchema },
      { name: 'Image', schema: ImageSchema },
      ,
    ]),
  ],
  controllers: [PropertyController],
  providers: [PropertyService, JwtStrategy],
  exports: [PropertyService],
})
export class PropertyModule {}
