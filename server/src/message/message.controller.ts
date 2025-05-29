import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddNewMessageDto, SetMaxMessagesDto } from 'src/incom.dto';
import { MessageService } from './message.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('messages')
@Controller('use')
export class MessageController {
  constructor(private messageService: MessageService) {}
  @Post('/setmaxmessages')
  @ApiOperation({ summary: 'Установить максимальное количетво сообщений' })
  @ApiResponse({ status: 201, description: 'Успешно устоновлено.' })
  setMaxMessages(@Body() body: SetMaxMessagesDto) {
    return this.messageService.setMaxMessages(body.maxmessages);
  }

  @Post('/addnewmessage')
  @ApiOperation({ summary: 'Добавить новое сообщение' })
  @ApiResponse({ status: 201, description: 'Сообщение успешно добавлено.' })
  addNewMessage(@Body() body: AddNewMessageDto) {
    return this.messageService.addNewMessage(body.newmessage);
  }

  @Get('/getallconts')
  @ApiOperation({ summary: 'Получить все контейнеры с сообщениями' })
  @ApiResponse({ status: 201, description: 'Успешно получено.' })
  async getAllConts() {
    console.log(this.messageService.getMaxMessages());
    return {
      conts: await this.messageService.getAllWithMessages(),
      max: this.messageService.getMaxMessages(),
    };
  }
}
