import { Movie } from '../movie/movie.schema';
import { User } from '../user/user.schema';

export enum EnumFileTypes {
  JSON = 'json',
  CSV = 'csv',
}

export type FileTypes = EnumFileTypes.CSV | EnumFileTypes.JSON;
export type DataTypes = Movie[] | User[];
