import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ERROR_MESSAGE } from '../../helpers/constants';
import { UserService } from '../user.service';
import { MailService } from '../../mail/mail.service';
import { RolePermissions } from '../../enums/rolePermissions.enum';
import { Permissions } from '../../enums/permission.enum';
import { User, UserDocument } from '../user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
    private mailService: MailService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async login(authDto: AuthDto): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email: authDto.email }).exec();
    if (!user) throw new NotFoundException(ERROR_MESSAGE.USER_ID);
    if (user.password !== authDto.password)
      throw new NotFoundException(ERROR_MESSAGE.USER_DOES_NOT_AUTH);
    return user;
  }

  generateToken(_id: string, email: string, roles: string[]) {
    const secret = this.configService.get('JWT_SECRET');
    return this.jwtService.sign({ _id, email, roles }, { secret });
  }

  async sendLinkToUser(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGE.ERROR_USER_NOT_EXIST);
    }

    const clientUrl = this.configService.get('CLIENT_URL');
    const token = this.generateToken(
      user._id.toString(),
      user.email,
      user.roles,
    );
    const link = `${clientUrl}/auth/${token}`;
    console.log(link);
    const html = `<p><a href="${link}">Войти в аккаунт</a></p>`;

    this.mailService.sendMessage({
      email: user.email,
      subject: 'Login link',
      html,
    });
  }

  async checkPermission(user: UserDocument, permission: Permissions) {
    const hasPermission = user.roles.some((role: string) =>
      (RolePermissions as Record<string, string[]>)[role].includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException(ERROR_MESSAGE.ERROR_PERMISSIONS);
    }

    return hasPermission;
  }
}
