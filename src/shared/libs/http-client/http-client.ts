import axios from 'axios';
import type {MockServerData} from '../../../types/index.js';

export async function getMockServerData(url: string): Promise<MockServerData> {
  const response = await axios.get<MockServerData>(url);

  return response.data;
}
