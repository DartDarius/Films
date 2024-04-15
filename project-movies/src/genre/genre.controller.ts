import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Headers,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Public } from '../decorators/public.decorator';
import { ApiTags, ApiBasicAuth } from '@nestjs/swagger/dist';
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/roles.decorator';

@ApiBasicAuth()
@ApiTags('genre')
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @Roles(Role.Admin)
  async create(
    @Body() createGenreDto: CreateGenreDto,
    @Headers('Authorization') auth: string,
  ) {
    return this.genreService.create(createGenreDto, auth);
  }

  @Public()
  @Get()
  findAll() {
    return this.genreService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateGenreDto: UpdateGenreDto,
    @Headers('Authorization') auth: string,
  ) {
    return this.genreService.update(id, updateGenreDto, auth);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async remove(
    @Param('id') id: string,
    @Headers('Authorization') auth: string,
  ) {
    return this.genreService.remove(id, auth);
  }
}
