import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { AwsbedrockModule } from '@modules/awsbedrock/awsbedrock.module';

@Module({
  imports: [AwsbedrockModule],
  providers: [ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
