import { Injectable } from '@nestjs/common';
import { BedrockResponse } from './interfaces/bedrock-response.interface';
import { NewMessageDto } from './dto/new-message.dto';
import { AWSBedrockWrapper } from './bedrock.helpers';

@Injectable()
export class AiService {
    async chat(newMessageDto: NewMessageDto): Promise<BedrockResponse> {

        const bedrock = new AWSBedrockWrapper("eu-central-1","local","chatto");
        const response = bedrock.invoke(newMessageDto.model, newMessageDto.message);
        return response;
    }
}
