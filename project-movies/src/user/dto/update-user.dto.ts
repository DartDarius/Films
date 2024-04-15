import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  nickName?: string;
  @ApiProperty()
  roles?: string[];
  @ApiProperty()
  password?: string;
  @ApiProperty()
  playList?: string[];
}
