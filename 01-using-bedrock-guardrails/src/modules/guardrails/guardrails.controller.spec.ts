import { Test, TestingModule } from '@nestjs/testing';
import { GuardrailsController } from './guardrails.controller';

describe('GuardrailsController', () => {
  let controller: GuardrailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuardrailsController],
    }).compile();

    controller = module.get<GuardrailsController>(GuardrailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
