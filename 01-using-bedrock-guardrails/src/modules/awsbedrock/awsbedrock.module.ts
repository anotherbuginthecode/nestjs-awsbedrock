import { Module } from '@nestjs/common';
import { AwsbedrockService } from './application/services/awsbedrock.service'

@Module({
  providers: [AwsbedrockService],
  exports: [AwsbedrockService]
})
export class AwsbedrockModule {}
