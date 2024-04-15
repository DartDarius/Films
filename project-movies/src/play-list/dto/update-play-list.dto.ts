import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayListDto } from './create-play-list.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlayListDto extends PartialType(CreatePlayListDto) {
  @ApiProperty()
  name: string;
  @ApiProperty()
  movies: string[];
  @ApiProperty()
  owner: string;
  @ApiProperty()
  isPrivate: boolean;
  @ApiProperty()
  entriesCount?: number;
}
