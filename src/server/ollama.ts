export interface OllamaInput {
  baseUrl?: string;
  model?: string;
  temperature?: number;
  topP?: number;
  [key: string]: any;
}

export class Ollama {
  baseUrl: string;
  model: string;
  temperature: number;

  constructor(fields?: OllamaInput) {
    this.baseUrl = (fields?.baseUrl || process.env.OLLAMA_BASE_URL || 'http://localhost:11434').replace(/\/$/, '');
    this.model = fields?.model || 'llama3.2:3b';
    this.temperature = fields?.temperature ?? 0.88;
  }

  async invoke(input: string): Promise<string> {
    const res = await fetch(`${this.baseUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.model,
        prompt: input,
        stream: false,
        options: {
          temperature: this.temperature,
        },
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`Ollama HTTP Error ${res.status}: ${errText || res.statusText}`);
    }

    const data: any = await res.json();
    return data?.response || '';
  }
}
