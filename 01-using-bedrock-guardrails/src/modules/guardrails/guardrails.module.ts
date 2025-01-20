import { Module } from '@nestjs/common';
import { GuardrailsController } from './guardrails.controller';
import { GuardrailsService } from './application/services/guardrails.service';
import { AwsbedrockModule } from '@modules/awsbedrock/awsbedrock.module';

@Module({
  imports: [AwsbedrockModule],
  controllers: [GuardrailsController],
  providers: [GuardrailsService]
})
export class GuardrailsModule {}
