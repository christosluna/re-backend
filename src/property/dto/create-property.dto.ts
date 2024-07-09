import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyDto {
  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  propertyType: string;

  @ApiProperty()
  agentID: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  bedrooms: string;

  @ApiProperty()
  bathrooms: string;

  @ApiProperty()
  area: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ required: false })
  file?: any;
}
