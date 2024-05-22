import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AgentModule } from './agent/agent.module';
import { ClientModule } from './client/client.module';
import { PropertyModule } from './property/property.module';
import { TransactionModule } from './transaction/transaction.module';

import { AppService } from './app.service';

import { ClientController } from './client/client.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rpuno:root@cluster0.wfqnywi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    // MongooseModule.forRoot('mongodb://127.0.0.1/nestjs_tutorial'),
    UserModule,
    AuthModule,
    ClientModule,
    PropertyModule,
    AgentModule,
    TransactionModule,
  ],
  controllers: [AppController, ClientController],
  providers: [AppService],
})
export class AppModule {}
