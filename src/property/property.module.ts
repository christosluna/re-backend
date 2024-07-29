import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { MongooseModule } from '@nestjs/mongoose';

import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';

import { PropertySchema } from './schemas/Property.schema';
import { ViewingRequestSchema } from './schemas/ViewingRequest.schema';
import { ClientSchema } from '../client/schemas/Client.schema';
import { JwtStrategy } from '../_core/guard/jwt.strategy';
import { ImageSchema } from './schemas/Image.schema';

import { TRANSCODE_QUEUE } from './constants/constants';
import { UploadConsumer } from './processors/upload.processor';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Property', schema: PropertySchema },
      { name: 'ViewingRequest', schema: ViewingRequestSchema },
      { name: 'Client', schema: ClientSchema },
      { name: 'Image', schema: ImageSchema },
      ,
    ]),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: TRANSCODE_QUEUE,
    }),
  ],
  controllers: [PropertyController],
  providers: [PropertyService, JwtStrategy, UploadConsumer],
  exports: [PropertyService],
})
export class PropertyModule {}
