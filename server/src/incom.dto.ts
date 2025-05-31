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

export class FindMessageDto {
  @ApiProperty({ example: 'Example', description: 'Строка' })
  @IsNotEmpty()
  @IsString()
  message: string;
}

export class GetContsDto {
  @ApiProperty({ example: 50, description: 'Целое, положительное число' })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  limit: number;

  @ApiProperty({ example: 1, description: 'Целое, положительное число' })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  offset: number;
}

export class SetMaxMessagesDto {
  @ApiProperty({ example: 5, description: 'Целое, положительное число' })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  maxmessages: number;
}

export class AddNewMessageDto {
  @ApiProperty({
    example: 'Example',
    description:
      'Строка, Допустимы только латинские буквы, цифры и стандартные символы',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @Matches(/^[A-Za-z0-9 .,!?'"@#$%^&*()\-_=+]*$/, {
    message: 'Допустимы только латинские буквы, цифры и стандартные символы',
  })
  newmessage: string;
}
