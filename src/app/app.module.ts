import { Module } from '@nestjs/common';
import { AiModule } from './ai/ai.module';
import { AppController } from './app.controller';
import { AwsbedrockModule } from './awsbedrock/awsbedrock.module';


@Module({
  imports: [AiModule, AwsbedrockModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
