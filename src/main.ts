import { parseStream } from '@fast-csv/parse';
import { format } from '@fast-csv/format';
import { createReadStream } from 'fs';
import { LoggerService } from './logger.service';
import { MatrixRotatorService } from './matrix-rotator.service';
import { isValidJson, isValidSquareMatrix } from './validators';

const csvFilePath = process.argv[2];

const initialHeaders = ['id', 'json'];
const outputHeaders = ['id', 'json', 'is_valid'];

class Parser {
  logger: LoggerService = new LoggerService();
  matrixRotator: MatrixRotatorService = new MatrixRotatorService();
  formatter = format();

  constructor(private csvFile: string) {
    this.formatter.pipe(process.stdout);
  }

  private static isFirstRow(row: string[]): boolean {
    return row.every((header) => initialHeaders.indexOf(header) >= 0);
  }

  private static isValidData(id: string, json: string): boolean {
    if (!id) {
      return false;
    }

    if (!isValidJson(json)) {

      return false;
    }

    const array = JSON.parse(json);

    return Array.isArray(array) && isValidSquareMatrix(array.length);
  }

  public exec() {
    const readableStream = createReadStream(this.csvFile);
    parseStream(readableStream)
      .on('error', this.onError.bind(this))
      .on('data', this.onData.bind(this))
      .on('end', this.onEnd.bind(this));
  }

  private onError(error: Error): void {
    this.logger.error(error);
    process.exit(1);
  }

  private onData(row: string[]): void {
    if (Parser.isFirstRow(row)) {
      this.formatter.write(outputHeaders);

      return;
    }

    const [id, json] = row;

    if (!Parser.isValidData(id, json)) {
      this.writeInvalidRow(id);

      return;
    }

    this.writeValidRow(id, this.parse(json));
  }

  private onEnd(): void {
    this.formatter.end();
  }

  private parse(json: string): number[] {
    const array = JSON.parse(json);

    return array.length <= 1 ? array : this.matrixRotator.exec(array);
  }

  private writeInvalidRow(id: string) {
    if (id) {
      this.formatter.write([id, JSON.stringify([]), false]);
    }
  }

  private writeValidRow(id: string, array: number[]) {
    this.formatter.write([id, JSON.stringify(array), true]);
  }
}

const parser = new Parser(csvFilePath);

parser.exec();
