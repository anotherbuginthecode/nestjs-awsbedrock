import { BadRequestException, Injectable } from '@nestjs/common';
import { MessageDto } from '../dto/message.dto';
import { AwsbedrockService } from '@modules/awsbedrock/application/services/awsbedrock.service';
import { Comment } from '@modules/comments/domain/entities/comment.entity';
import { CommentsRepository } from '@modules/comments/infrastructure/respositories/comments.repository';

@Injectable()
export class CommentsService {

  constructor(
    private readonly awsbedrockService: AwsbedrockService, 
    private readonly repository: CommentsRepository
  ) {}

  async create(message: MessageDto): Promise<Comment> {
    const response = await this.awsbedrockService.apply_guardrail(message.message);
    if(response.action === "GUARDRAIL_INTERVENED"){
      throw new BadRequestException(response);
    }else{
      const newMessage = new Comment(message.message);
      return this.repository.save(newMessage);
    }
  }

}
