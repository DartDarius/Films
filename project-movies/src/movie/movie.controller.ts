import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Headers,
  Res,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Public } from '../decorators/public.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger/dist';
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/roles.decorator';
import { AuthService } from '../user/auth/auth-user.service';
import { Request, Response } from 'express';
import { Permissions } from '../enums/permission.enum';
import { EnumFileTypes } from '../modulesForExport/typesOfFormat';

@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly authService: AuthService,
  ) {}

  @ApiBearerAuth()
  @Post()
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @Headers('Authorization') auth: string,
    @Req() req: Request,
  ) {
    const { user }: any = req;
    this.authService.checkPermission(user, Permissions.CREATE_MOVIES);
    this.movieService.resetCache();
    return this.movieService.create(createMovieDto, auth);
  }

  @ApiBearerAuth()
  @Public()
  @Get('public')
  findMovie(@Headers('Authorization') auth: string) {
    if (auth) {
      return this.movieService.findAll();
    } else {
      return this.movieService.findMovieName();
    }
  }

  @Public()
  @Get('/file')
  async GetMovies(@Res() res: Response, @Query('type') type: EnumFileTypes) {
    const movies = await this.movieService.getAllMovies();
    const filePath = await this.movieService.generateFile(type, movies);
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename=data.${type}`,
    });
    res.sendFile(filePath);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @Headers('Authorization') auth: string,
  ) {
    this.movieService.resetCache();
    return this.movieService.update(id, updateMovieDto, auth);
  }

  @ApiBearerAuth()
  @ApiTags('delete movie by id')
  @Delete(':id')
  @Roles(Role.Admin)
  async remove(
    @Param('id') id: string,
    @Headers('Authorization') auth: string,
  ) {
    this.movieService.resetCache();
    return this.movieService.remove(id, auth);
  }
}
