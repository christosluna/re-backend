import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ClientController } from './client.controller';

import { ClientService } from './client.service';

import { ClientSchema } from './Schema/Client.schema';
import { ViewingRequestSchema } from 'src/property/schema/ViewingRequest.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Client', schema: ClientSchema },
      { name: 'ViewingRequest', schema: ViewingRequestSchema },
    ]),
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
