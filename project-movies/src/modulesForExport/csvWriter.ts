import * as fs from 'fs';
import * as fastCsv from 'fast-csv';

export class CsvWriter {
  async write(data: any[]) {
    return new Promise<void>((resolve, reject) => {
      const csvStream = fastCsv.format({ headers: true });
      const writeStream = fs.createWriteStream('data.csv');

      csvStream.pipe(writeStream);

      data.forEach((item) => {
        const csvData = {
          id: item.id,
          nickName: item.nickName,
          email: item.email,
          roles: item.roles,
          password: item.password,
          playList: item.playList,
        };

        csvStream.write(csvData);
      });

      csvStream.end();

      writeStream.on('finish', () => {
        resolve();
      });

      writeStream.on('error', (error) => {
        reject(error);
      });
    });
  }
}
