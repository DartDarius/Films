import { ApiProperty } from '@nestjs/swagger';

export class CreateMediaDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  article: string;
}
