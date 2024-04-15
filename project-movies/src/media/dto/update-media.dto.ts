import { PartialType } from '@nestjs/swagger';
import { CreateMediaDto } from './create-media.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMediaDto extends PartialType(CreateMediaDto) {
  @ApiProperty()
  title: string;
  @ApiProperty()
  article: string;
}
