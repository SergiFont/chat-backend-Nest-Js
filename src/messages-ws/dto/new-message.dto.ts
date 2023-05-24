// import { IsOptional, IsString, MinLength } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

// export class NewMessageDto {

//     @IsString()
//     @MinLength(1)
//     from: string

//     @IsString()
//     @MinLength(1)
//     message: string

// }

export class MessageFromClient {

    @ApiProperty()
    from: string;

    @ApiProperty()
    message: string;

    @ApiProperty()
    Authorization: string;
    
  }