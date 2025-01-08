import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from './ai.service';
import { NewMessageDto } from './dto/new-message.dto';

describe('AiService', () => {
  let service: AiService;

  const mockAIService = {
    chat: jest.fn().mockImplementation((newMessage: NewMessageDto) => {
      return {
        model: newMessage.model,
        answer: 'Hello',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: AiService, useValue: mockAIService }],
    }).compile();

    service = module.get<AiService>(AiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the answer form the AI', () => {
    const message: NewMessageDto = {
      message: 'Hello',
      model: 'amazon.titan-text-lite-v1',
    };

    expect(service.chat(message)).toStrictEqual({
      model: message.model,
      answer: expect.any(String)
    });
  });
});
