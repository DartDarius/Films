import { DataTypes } from './typesOfFormat';

export interface Writer {
  write(data: DataTypes): Promise<any>;
}
