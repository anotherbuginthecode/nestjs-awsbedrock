import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CommentsService } from './application/services/comments.service';
import { MessageDto } from './application/dto/message.dto';
import { Comment } from './domain/entities/comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly CommentsService: CommentsService) {}

  @Post('')
  @HttpCode(200)
  async create(@Body() newMessage: MessageDto): Promise<any> {
    return await this.CommentsService.create(newMessage);
  }
}
