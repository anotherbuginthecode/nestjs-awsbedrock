import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { IBedrockResponse } from '@modules/awsbedrock/domain/interfaces/bedrock-response.interface';
import { IBedrockInput } from '@modules/awsbedrock/domain/interfaces/bedrock-input.interface';

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

  async invoke(prompt: IBedrockInput): Promise<IBedrockResponse> {
    

    const systemPrompt = 'Detect and flag any personally identifiable information (PII) in the user comments.\nDetect and flag any rude or inappropriate language in the user comments.';
    const command = new InvokeModelCommand({
      modelId: this.configService.get<string>('MODEL_ID'),
      guardrailIdentifier: this.configService.get<string>('GUARDRAIL_IDENTIFIER'),
      guardrailVersion: this.configService.get<string>('GUARDRAIL_VERSION') || 'DRAFT',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        inputText: "System: " + systemPrompt + "\nUser: " + prompt.message,
      }),
    });

    const response = await this.client.send(command);
    const decodedResponseBody: IBedrockResponse = JSON.parse(
      new TextDecoder().decode(response.body),
    );

    return  decodedResponseBody
  }
}
