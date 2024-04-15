import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
  Res,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from './auth/auth-user.service';
import { Public } from '../decorators/public.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger/dist';
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/roles.decorator';
import { EnumFileTypes } from '../modulesForExport/typesOfFormat';
import { Response } from 'express';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Get('/file/csv')
  async getUsers(@Res() res: Response, @Query('type') type: EnumFileTypes) {
    const users = await this.userService.findAll();
    const filePath = await this.userService.generateFile(type, users);
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename=data.${type}`,
    });
    res.sendFile(filePath);
  }

  @Get(':id')
  @Roles(Role.Admin)
  async findOne(
    @Param('id') id: string,
    @Headers('Authorization') auth: string,
  ) {
    return this.userService.findOne(id, auth);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
