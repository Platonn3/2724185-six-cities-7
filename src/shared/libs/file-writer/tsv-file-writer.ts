import {once} from 'node:events';
import {createWriteStream} from 'node:fs';
import {mkdir} from 'node:fs/promises';
import {dirname} from 'node:path';

type LineFactory = () => string;

export class TsvFileWriter {
  constructor(private readonly filepath: string) {}

  public async write(lineCount: number, createLine: LineFactory): Promise<void> {
    await mkdir(dirname(this.filepath), {recursive: true});

    const stream = createWriteStream(this.filepath, {encoding: 'utf-8'});

    try {
      for (let index = 0; index < lineCount; index++) {
        if (!stream.write(`${createLine()}\n`)) {
          await once(stream, 'drain');
        }
      }

      const finished = once(stream, 'finish');
      stream.end();
      await finished;
    } catch (error: unknown) {
      stream.destroy();
      throw error;
    }
  }
}
