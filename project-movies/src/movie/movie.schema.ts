import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Director } from '../director/director.schema';
import { Genre } from '../genre/genre.schema';
import * as mongoose from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  year: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Director' }] })
  director?: Director[];

  @Prop([String])
  cast: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }] })
  genre?: Genre[];

  @Prop()
  duration: number;

  @Prop([String])
  country: string[];
}

export interface MovieTitle {
  title: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
