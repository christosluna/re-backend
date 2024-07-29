import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
  Res,
  UploadedFiles,
} from '@nestjs/common';
import * as path from 'path';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { JwtAuthGuard } from '../_core/guard/auth-jwt.guard';

import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { TRANSCODE_QUEUE } from './constants/constants';

@ApiTags('Property')
@Controller('property')
export class PropertyController {
  constructor(
    private readonly propertyService: PropertyService,
    @InjectQueue(TRANSCODE_QUEUE) private transcodeQueue: Queue,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/_core/assets/Images',
        filename: (req, file, callBack) => {
          const fileName =
            path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();
          const extension = path.parse(file.originalname).ext;
          callBack(null, `${fileName}${extension}`);
        },
      }),
    }),
  )
  createProperty(
    @Body() createPropertyDto: CreatePropertyDto,
    @UploadedFile() file,
    @Res() res,
  ) {
    this.propertyService.createProperty(createPropertyDto, file.path);

    const filePath = res.status(HttpStatus.OK).json({
      success: true,
      data: file.path,
    });

    return filePath;
  }

  @Post('upload/:id')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      storage: diskStorage({
        destination: './src/_core/assets/Images',
        filename: (req, file, callBack) => {
          const fileName =
            path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();
          const extension = path.parse(file.originalname).ext;
          callBack(null, `${fileName}${extension}`);
        },
      }),
    }),
  )
  async uploadImage(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id')
    propertyID: string,
  ) {
    for (const file of files) {
      await this.transcodeQueue.add(
        TRANSCODE_QUEUE,
        {
          buffer: file.buffer,
          originalName: file.originalname,
          type: file.mimetype,
        },
        { delay: 3000 },
      );

      await this.propertyService.uploadImage(propertyID, file.path);
    }

    return {
      message: 'File Uploaded Successfully',
      status: 200,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.propertyService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertyService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyService.remove(id);
  }

  // @Post('create/feature')
  // createFeature(@Body() createPropertyDto: CreatePropertyDto) {
  //   return this.propertyService.createFeature(createPropertyDto);
  // }
}
