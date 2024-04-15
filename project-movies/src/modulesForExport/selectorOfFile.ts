import { CsvWriter } from './csvWriter';
import { EnumFileTypes } from './typesOfFormat';
import { JsonWriter } from './jsonWriter';

export class TypeSelector {
  private static writers = {
    [EnumFileTypes.JSON]: new JsonWriter(),
    [EnumFileTypes.CSV]: new CsvWriter(),
  };

  static selectorWriter(fileType: EnumFileTypes) {
    return TypeSelector.writers[fileType];
  }
}
