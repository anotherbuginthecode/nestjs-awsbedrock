import { BadRequestException, Injectable } from '@nestjs/common';
import { IBedrockResponse } from '@modules/awsbedrock/domain/interfaces/bedrock-response.interface';
import { IBedrockInput } from '@modules/awsbedrock/domain/interfaces/bedrock-input.interface';
import { MessageDto } from '../dto/message.dto';
import { AwsbedrockService } from '@modules/awsbedrock/application/services/awsbedrock.service';
import { Comment } from '@modules/comments/domain/entities/comment.entity';
import { CommentsRepository } from '@modules/comments/infrastructure/respositories/comments.repository';

@Injectable()
export class CommentsService {

  constructor(private readonly awsbedrockService: AwsbedrockService, private readonly repository: CommentsRepository) {}

  async create(message: MessageDto): Promise<Comment> {
    const bedrockInput: IBedrockInput = {
      message: message.message,
    };

    const check: IBedrockResponse = await this.awsbedrockService.invoke(bedrockInput);
    if(check['amazon-bedrock-guardrailAction'] === "NONE") {
      const newMessage = new Comment(message.message);
      return this.repository.save(newMessage);
    } else if (check['amazon-bedrock-guardrailAction'] === "INTERVENED") {
      throw new BadRequestException(check.results[0].outputText);
    } else {
      throw new Error('Unknown error');
    }
  }

}
