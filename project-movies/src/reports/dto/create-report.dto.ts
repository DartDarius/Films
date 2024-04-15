import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty()
  countMovies: number;
  @ApiProperty()
  countUsers: number;
  @ApiProperty()
  countPlayLists: number;
}
