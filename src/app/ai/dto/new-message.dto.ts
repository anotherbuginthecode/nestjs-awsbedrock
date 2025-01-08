import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const NewMessageSchema = z.object({
    message: z.string().min(1, { message: 'Message should not be empty' }),
    model: z.enum(["amazon.titan-text-lite-v1", "anthropic.claude-3-5-sonnet-20240620-v1:0"], { message: 'Model not found' }),
});

export class NewMessageDto extends createZodDto(NewMessageSchema) {}