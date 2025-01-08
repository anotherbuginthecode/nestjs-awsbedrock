import { Test, TestingModule } from '@nestjs/testing';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { NewMessageDto } from './dto/new-message.dto';

describe('AiController', () => {
  let controller: AiController;
  const mockAIService = {
    chat: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiController],
      providers: [{ provide: AiService, useValue: mockAIService }],
    }).compile();

    controller = module.get<AiController>(AiController);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the answer form the AI', () => {
    const message: NewMessageDto = {
      message: 'Hello',
      model: 'amazon.titan-text-lite-v1',
    };

    controller.chat(message);
    expect(mockAIService.chat).toHaveBeenCalledWith(message);
  });
});
