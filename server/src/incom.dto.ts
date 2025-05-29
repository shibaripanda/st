import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';

export class SetMaxMessagesDto {
  @ApiProperty({ example: 5, description: 'Объект' })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  maxmessages: number;
}

export class AddNewMessageDto {
  @ApiProperty({ example: 'Example', description: 'Объект' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @Matches(/^[A-Za-z0-9 .,!?'"@#$%^&*()\-_=+]*$/, {
    message: 'Допустимы только латинские буквы, цифры и стандартные символы',
  })
  newmessage: string;
}
