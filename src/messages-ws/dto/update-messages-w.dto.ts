import { PartialType } from '@nestjs/swagger';
import { CreateMessagesWDto } from './create-messages-w.dto';

export class UpdateMessagesWDto extends PartialType(CreateMessagesWDto) {}
