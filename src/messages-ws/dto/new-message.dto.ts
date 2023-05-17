// import { IsOptional, IsString, MinLength } from "class-validator";

// export class NewMessageDto {

//     @IsString()
//     @MinLength(1)
//     from: string

//     @IsString()
//     @MinLength(1)
//     message: string

// }

export interface MessageFromClient {
    from: string;
    message: string;
    Authorization: string;
  }