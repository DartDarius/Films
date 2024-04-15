import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  HttpCode,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Public } from '../decorators/public.decorator';
import { ApiTags, ApiBasicAuth } from '@nestjs/swagger/dist';
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/roles.decorator';

@ApiBasicAuth()
@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @Roles(Role.Admin)
  @HttpCode(204)
  create(
    @Body() createMediaDto: CreateMediaDto,
    @Headers('Authorzation') auth: string,
  ) {
    return this.mediaService.create(createMediaDto, auth);
  }

  @Public()
  @HttpCode(200)
  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @Public()
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  @Roles(Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateMediaDto: UpdateMediaDto,
    @Headers('Authorization') auth: string,
  ) {
    return this.mediaService.update(id, updateMediaDto, auth);
  }

  @Delete(':id')
  @HttpCode(200)
  @Roles(Role.Admin)
  remove(@Param('id') id: string, @Headers('Authorization') auth: string) {
    return this.mediaService.remove(id, auth);
  }
}
