import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GuardrailsModule } from '@modules/guardrails/guardrails.module';
import { AwsbedrockModule } from '@modules/awsbedrock/awsbedrock.module';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GuardrailsModule,
    CommentsModule, 
    AwsbedrockModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
