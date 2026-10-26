import type {RestConfigSchema} from './rest.config.js';

export interface Config {
  get<Key extends keyof RestConfigSchema>(key: Key): RestConfigSchema[Key];
}
