import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const MessageSchema = z.object({
  message: z.string().min(1, { message: "Message is required" }),
});

export class MessageDto extends createZodDto(MessageSchema) {}