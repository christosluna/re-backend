import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { Processor } from '@nestjs/bullmq';
import { WorkerHost } from '@nestjs/bullmq';

import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { ImageDocument } from '../schemas/Image.schema';

import { TRANSCODE_QUEUE } from '../constants/constants';

@Processor(TRANSCODE_QUEUE)
export class UploadConsumer extends WorkerHost {
  private readonly logger = new Logger(UploadConsumer.name);
  async process(job: Job<any, any, string>): Promise<any> {
    console.log(job.data);
  }

  async doSomething(data) {
    console.log('doSomething', data);
  }

  async doSomeLogic2() {
    console.log('doSomeLogic2');
  }
}
