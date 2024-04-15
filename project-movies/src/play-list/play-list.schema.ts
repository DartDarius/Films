import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Movie } from '../movie/movie.schema';
import { User } from '../user/user.schema';
import * as mongoose from 'mongoose';

export type PlayListDocument = HydratedDocument<PlayList>;

@Schema()
export class PlayList {
  @Prop()
  name: string;

  @Prop({
    type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Movie', unique: true }],
    validate: {
      validator: function (movies: mongoose.Types.ObjectId[]) {
        return movies.length === new Set(movies.map(String)).size;
      },
      message: 'Movies array should have unique ObjectId values.',
    },
  })
  movies: Movie[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ default: true })
  isPrivate: boolean;

  @Prop({ default: 0 })
  entriesCount: number;
}

export const PlayListSchema = SchemaFactory.createForClass(PlayList);
