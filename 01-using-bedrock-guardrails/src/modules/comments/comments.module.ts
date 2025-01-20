import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './application/services/comments.service';
import { AwsbedrockModule } from '@modules/awsbedrock/awsbedrock.module';
import { CommentsRepository } from './infrastructure/respositories/comments.repository';

@Module({
  imports: [AwsbedrockModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
})
export class CommentsModule {}
