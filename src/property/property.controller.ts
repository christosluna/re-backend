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
} from '@nestjs/common';
import * as path from 'path';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { JwtAuthGuard } from '../_core/guard/auth-jwt.guard';

@ApiTags('Property')
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

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
  uplodadImage(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() { propertyID },
    @Res() res,
  ) {
    console.log('propertyID', propertyID);
    return res;
    const filePath = res.status(HttpStatus.OK).json({
      success: true,
      data: file.path,
    });
    return this.propertyService.uplodadImage(propertyID, filePath);
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
