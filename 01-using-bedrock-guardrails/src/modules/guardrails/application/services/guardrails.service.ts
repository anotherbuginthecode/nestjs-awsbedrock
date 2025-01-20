import { Injectable } from '@nestjs/common';
import { IBedrockResponse } from '@modules/awsbedrock/domain/interfaces/bedrock-response.interface';
import { IBedrockInput } from '@modules/awsbedrock/domain/interfaces/bedrock-input.interface';
import { MessageDto } from '../dto/message.dto';
import { AwsbedrockService } from '@modules/awsbedrock/application/services/awsbedrock.service';

@Injectable()
export class GuardrailsService {

  constructor(private readonly awsbedrockService: AwsbedrockService) {}

  async check(message: MessageDto): Promise<IBedrockResponse> {
    const bedrockInput: IBedrockInput = {
      message: message.message,
    };

    return this.awsbedrockService.invoke(bedrockInput);
  }

}
