import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { Public } from '../decorators/public.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger/dist';
import mongoose from 'mongoose';
import { MovieService } from '../movie/movie.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('director')
@Controller('director')
export class DirectorController {
  constructor(
    private readonly directorService: DirectorService,
    private readonly movieService: MovieService,
    @InjectConnection() private connection: mongoose.Connection,
  ) {}

  @Post()
  @Roles(Role.Admin)
  async create(
    @Body() createDirectorDto: CreateDirectorDto,
    @Headers('Authorization') auth: string,
  ) {
    return this.directorService.create(createDirectorDto, auth);
  }

  @Public()
  @Get()
  findAll() {
    return this.directorService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directorService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateDirectorDto: UpdateDirectorDto,
    @Headers('Authorization') auth: string,
  ) {
    return this.directorService.update(id, updateDirectorDto, auth);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async remove(
    @Param('id') id: string,
    @Headers('Authorization') auth: string,
  ) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const director = await this.movieService.removeDirectorFromMovie(
        id,
        session,
      );
      await this.directorService.remove(id, auth, session);
      await session.commitTransaction();
      return `Direcor ${director} deleted from Movie`;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
