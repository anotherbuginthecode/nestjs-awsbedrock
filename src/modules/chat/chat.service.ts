import { Injectable } from '@nestjs/common';
import { BedrockResponse } from '@modules/awsbedrock/interfaces/bedrock-response.interface';
import { NewMessageDto } from './dto/new-message.dto';
import { AwsbedrockService } from '@modules/awsbedrock/awsbedrock.service';

@Injectable()
export class ChatService {

    constructor(private readonly awsbedrockService: AwsbedrockService) {}

    async chat(newMessageDto: NewMessageDto): Promise<BedrockResponse> {
        return await this.awsbedrockService.invoke(newMessageDto.model, newMessageDto.message);
    }
}
