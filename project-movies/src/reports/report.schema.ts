import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export type ReportDocument = HydratedDocument<Report>;

@Schema()
export class Report {
  @ApiProperty()
  @Prop()
  countMovies: number;

  @ApiProperty()
  @Prop()
  countPlayLists: number;

  @ApiProperty()
  @Prop()
  countUsers: number;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
