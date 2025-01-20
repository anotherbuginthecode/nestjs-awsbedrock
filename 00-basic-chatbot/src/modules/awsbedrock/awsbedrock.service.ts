import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { BedrockResponse } from './interfaces/bedrock-response.interface';

@Injectable()
export class AwsbedrockService {
  private readonly region: string;
  private readonly profile: string = 'default';
  private readonly runtime: string = 'aws';
  private client: BedrockRuntimeClient;

  constructor(private configService: ConfigService) {
    this.region = this.configService.get<string>('AWS_REGION');
    this.profile = this.configService.get<string>('AWS_PROFILE');
    this.runtime = this.configService.get<string>('AWS_RUNTIME');

    if (this.runtime === 'local') {
      this.client = new BedrockRuntimeClient({
        region: this.region,
        profile: this.profile,
      });
    } else {
      this.client = new BedrockRuntimeClient({ region: this.region });
    }
  }

  async invoke(modelId: string, prompt: string): Promise<BedrockResponse> {
    const command = new InvokeModelCommand({
      modelId: modelId,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        inputText: prompt,
        textGenerationConfig: {
          maxTokenCount: 512,
          temperature: 0.7,
        },
      }),
    });

    const response = await this.client.send(command);
    const decodedResponseBody = JSON.parse(
      new TextDecoder().decode(response.body),
    );

    return {
      answer: decodedResponseBody.results[0].outputText,
      model: modelId,
    };
  }
}
