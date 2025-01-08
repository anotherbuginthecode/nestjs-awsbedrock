import { Module } from '@nestjs/common';
import { AwsbedrockService } from './awsbedrock.service';

@Module({
  providers: [AwsbedrockService],
  exports: [AwsbedrockService],
})
export class AwsbedrockModule {}
