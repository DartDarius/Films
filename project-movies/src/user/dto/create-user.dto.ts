import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  nickName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  roles: string[];
  @ApiProperty()
  password: string;
  @ApiProperty()
  token?: string;
  @ApiProperty()
  playList?: string[];
}
