import { Body, Controller, Inject, Post } from '@nestjs/common';
import { NewMessageDto } from './dto/new-message.dto';
import { BedrockResponse } from './interfaces/bedrock-response.interface';
import { AiService } from './ai.service';
import { UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from '@middleware/transform.interceptors';

@Controller('ai')
@UseInterceptors(TransformInterceptor)
export class AiController {
    constructor(private readonly aiService: AiService) {}

    @Post('chat')
    async chat(@Body() messageDto: NewMessageDto): Promise<BedrockResponse> {
        return await this.aiService.chat(messageDto);
    }

}
