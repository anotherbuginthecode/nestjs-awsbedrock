import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { GuardrailsService } from './application/services/guardrails.service';
import { MessageDto } from './application/dto/message.dto';
import { IBedrockResponse } from '@modules/awsbedrock/domain/interfaces/bedrock-response.interface';

@Controller('guardrails')
export class GuardrailsController {
  constructor(private readonly guardrailsService: GuardrailsService) {}

  @Post('check')
  @HttpCode(200)
  async check(@Body() newMessage: MessageDto): Promise<IBedrockResponse> {
    return await this.guardrailsService.check(newMessage);
  }
}
