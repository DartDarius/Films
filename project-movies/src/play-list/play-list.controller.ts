import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PlayListService } from './play-list.service';
import { CreatePlayListDto } from './dto/create-play-list.dto';
import { UpdatePlayListDto } from './dto/update-play-list.dto';
import { ApiTags } from '@nestjs/swagger/dist';
import { isOwner } from './checkOwner/play-list.owner';
import { Public } from '../decorators/public.decorator';
import { UserService } from '../user/user.service';
import { PrivatePlayListGuard } from './playListGuard/play.list.guard';
import { UserDocument } from '../user/user.schema';

@ApiTags('play-list')
@Controller('play-list')
export class PlayListController {
  constructor(
    private readonly playListService: PlayListService,
    private readonly userService: UserService,
  ) {}

  @Post()
  create(@Body() createPlayListDto: CreatePlayListDto) {
    return this.playListService.create(createPlayListDto);
  }

  @Public()
  @Get()
  findPublicPlaylist() {
    return this.playListService.findPublicPlaylist();
  }

  @Public()
  @Get('top')
  findTopPlaylists() {
    return this.playListService.findTopPlaylists();
  }

  @Get()
  findAll() {
    return this.playListService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const { user }: any = req;
    const playlist = await this.playListService.findOne(id);
    if (playlist?.isPrivate) isOwner(user, playlist);
    return playlist;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlayListDto: UpdatePlayListDto,
    @Req() req: Request,
  ) {
    const { user }: any = req;
    const playlist = await this.playListService.findOne(id);
    if (playlist?.isPrivate) isOwner(user, playlist);
    return this.playListService.update(id, updatePlayListDto);
  }

  @UseGuards(PrivatePlayListGuard)
  @Patch(':id/addPlayList')
  async addPlayList(
    @Param('id') id: string,
    @Req() req: Request & { user: UserDocument },
  ) {
    const { user } = req;
    const userId = user._id.toString();
    await this.userService.addPlaylistToUser(userId, id);
    await this.playListService.changeCount(id, 1);
  }

  @UseGuards(PrivatePlayListGuard)
  @Patch(':id/delete')
  async deletePlaylist(
    @Param('id') id: string,
    @Req() req: Request & { user: UserDocument },
  ) {
    const { user } = req;
    const userId = user._id.toString();
    await this.userService.deletePlaylistFromUser(userId, id);
    await this.playListService.changeCount(id, -1);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const { user }: any = req;
    const playlist = await this.playListService.findOne(id);
    if (playlist?.isPrivate) isOwner(user, playlist);
    return this.playListService.remove(id);
  }
}
