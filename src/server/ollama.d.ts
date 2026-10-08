declare module '@langchain/community/llms/ollama' {
  export interface OllamaInput {
    baseUrl?: string;
    model?: string;
    temperature?: number;
    topP?: number;
    [key: string]: any;
  }

  export class Ollama {
    constructor(fields?: OllamaInput);
    invoke(input: string, options?: any): Promise<string>;
  }
}
