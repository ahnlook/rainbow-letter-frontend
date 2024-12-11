import apiRequest from 'api';

const RESOURCE = '/api/admins/ai';

export const getAIConfig = async () => {
  const response = await apiRequest.get(`${RESOURCE}/setting`);

  return response.data;
};

export const getAIParameters = async () => {
  const response = await apiRequest.get(`${RESOURCE}/parameters`);

  return response.data;
};

export type PromptType = 'A' | 'B';
interface AIConfig {
  useABTest: boolean;
  selectPrompt: PromptType;
}

export const putAIConfig = async (config: AIConfig) => {
  const response = await apiRequest.put(`${RESOURCE}/config`, config);

  return response.data;
};

interface AIPrompt {
  provider: 'OPENAI' | 'GEMINI';
  model: string;
  system: string;
  user: string;
  parameters: string[];
}

export const putAIPrompt = async (promptId: number, prompt: AIPrompt) => {
  const response = await apiRequest.put(
    `${RESOURCE}/prompt/${promptId}`,
    prompt
  );

  return response.data;
};

export interface AIOptions {
  frequencyPenalty: number;
  id?: number;
  maxTokens: number;
  presencePenalty: number;
  promptId?: number;
  stop: string[];
  temperature: number;
  topP: number;
}

export const putAIOptions = async (promptId: number, options: AIOptions) => {
  const response = await apiRequest.put(
    `${RESOURCE}/options/${promptId}`,
    options
  );

  return response.data;
};
