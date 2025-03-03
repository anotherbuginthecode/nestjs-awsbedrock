import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { NewMessageDto } from './dto/new-message.dto';
import { BedrockResponse } from '@modules/awsbedrock/interfaces/bedrock-response.interface';
import { ChatService } from './chat.service';
import { UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from '@middleware/transform.interceptors';

@Controller('chat')
@UseInterceptors(TransformInterceptor)
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post()
    @HttpCode(200)
    async chat(@Body() messageDto: NewMessageDto): Promise<BedrockResponse> {
        return await this.chatService.chat(messageDto);
    }
}
