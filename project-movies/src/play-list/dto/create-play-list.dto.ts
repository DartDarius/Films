import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayListDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  movies: string[];
  @ApiProperty()
  owner: string;
  @ApiProperty()
  isPrivate: boolean;
}
