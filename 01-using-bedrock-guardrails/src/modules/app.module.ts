import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AwsbedrockModule } from '@modules/awsbedrock/awsbedrock.module';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AwsbedrockModule,
    CommentsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
