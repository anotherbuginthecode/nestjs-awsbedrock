import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
  ApplyGuardrailRequest,
  ApplyGuardrailCommand
} from '@aws-sdk/client-bedrock-runtime';

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

  async apply_guardrail(message: string): Promise<any> {
    const input: ApplyGuardrailRequest = {
      guardrailIdentifier: this.configService.get<string>('GUARDRAIL_IDENTIFIER'),
      guardrailVersion: this.configService.get<string>('GUARDRAIL_VERSION') || 'DRAFT',
      source: 'INPUT',
      content: [{text: {text: message}}],
    }
    const command = new ApplyGuardrailCommand(input);
    return await this.client.send(command);
  }
}
