import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  year: number;
  @ApiProperty()
  director?: string[];
  @ApiProperty()
  cast?: string[];
  @ApiProperty()
  genre?: string[];
  @ApiProperty()
  duration: number;
  @ApiProperty()
  country?: string[];
}
