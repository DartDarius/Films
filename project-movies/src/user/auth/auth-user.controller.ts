import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { AuthService } from './auth-user.service';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger/dist';
import { Public } from '../../decorators/public.decorator';
import { AuthDto } from './dto/auth.dto';

@ApiTags('auth-check')
@Controller('user')
export class AuthUserController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() authDto: AuthDto) {
    const user = await this.authService.login(authDto);
    const token = this.authService.generateToken(
      user._id.toString(),
      user.email,
      user.roles,
    );
    return token;
  }

  @Public()
  @Post('/auth/link')
  async sendLink(@Body('email') email: string) {
    const sendLink = await this.authService.sendLinkToUser(email);
    return sendLink;
  }

  @Get('/me')
  me(@Req() req: Request) {
    const { user } = req;
    return user;
  }
}
