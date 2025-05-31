import { Body, Controller, Post } from '@nestjs/common';
import {
  AddNewMessageDto,
  FindMessageDto,
  GetContsDto,
  SetMaxMessagesDto,
} from 'src/incom.dto';
import { MessageService } from './message.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Conteiner } from 'src/conteiner/conteiner.entity';

@ApiTags('messages')
@Controller('use')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post('/findcontbymessage')
  @ApiOperation({ summary: 'Получить номр контейнера по сообщению' })
  @ApiResponse({ status: 201, description: 'Поиск выполнен.' })
  async findContByMessage(@Body() body: FindMessageDto) {
    return await this.messageService.findContIdByMessage(body.message);
  }

  @Post('/setmaxmessages')
  @ApiOperation({ summary: 'Установить максимальное количетво сообщений' })
  @ApiResponse({ status: 201, description: 'Успешно устоновлено.' })
  setMaxMessages(@Body() body: SetMaxMessagesDto) {
    return this.messageService.setMaxMessages(body.maxmessages);
  }

  @Post('/addnewmessage')
  @ApiOperation({ summary: 'Добавить новое сообщение' })
  @ApiResponse({ status: 201, description: 'Сообщение успешно добавлено.' })
  async addNewMessage(@Body() body: AddNewMessageDto) {
    return {
      newOrUpdatedCont: await this.messageService.addNewMessage(
        body.newmessage,
      ),
      countMessages: await this.messageService.getMessagesCount(),
      countConts: await this.messageService.getContsCount(),
    };
  }

  @Post('/getdataforstartapp')
  @ApiOperation({ summary: 'Получить данные для работы приложения' })
  @ApiResponse({ status: 201, description: 'Успешно получено.' })
  async getAllConts(@Body() body: GetContsDto) {
    const res: { data: Conteiner[]; total: number } =
      await this.messageService.getAllWithMessages(body.limit, body.offset);
    return {
      countMessages: await this.messageService.getMessagesCount(),
      conts: res.data,
      countConts: res.total,
      max: this.messageService.getMaxMessages(),
    };
  }
}
