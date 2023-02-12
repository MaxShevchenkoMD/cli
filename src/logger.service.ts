import { appendFile } from 'fs';
import { inspect, promisify } from 'util';

const appendFilePromise = promisify(appendFile);

const errorsFile = './errors.log';

export class LoggerService {

  async error(data: any): Promise<void> {
    await appendFilePromise(errorsFile, `\n${inspect(data, false, null)}`);
  }
}
