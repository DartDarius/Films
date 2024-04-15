import { Writer } from './writerFile';
import { DataTypes, EnumFileTypes } from './typesOfFormat';
import { TypeSelector } from './selectorOfFile';

export class FileWriter {
  fileType: EnumFileTypes;
  data: DataTypes;
  constructor(fileType: EnumFileTypes, data: DataTypes) {
    this.fileType = fileType;
    this.data = data;
  }
  async writeFile() {
    const writer: Writer = TypeSelector.selectorWriter(this.fileType);
    await writer.write(this.data);
  }
}
