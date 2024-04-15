import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PlayList } from '../play-list/play-list.schema';
import * as mongoose from 'mongoose';

export type UserDocument = HydratedDocument<User> & User;

@Schema()
export class User {
  @Prop()
  nickName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop([String])
  roles: string[];

  @Prop()
  password: string;

  @Prop()
  token?: string;

  @Prop({ type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'PlayList' }] })
  playList: PlayList[];
}

export const UserSchema = SchemaFactory.createForClass(User);
