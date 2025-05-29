import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { Conteiner } from 'src/conteiner/conteiner.entity';

@Injectable()
export class MessageService {
  public maxMessages: number | null;
  constructor(
    @InjectRepository(Conteiner)
    private conteinerRepo: Repository<Conteiner>,
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,
  ) {}

  setMaxMessages(maxMessages: number) {
    this.maxMessages = maxMessages;
    console.log('maxMessages');
    return this.maxMessages;
  }

  getMaxMessages() {
    return this.maxMessages;
  }

  async addNewMessage(newmessage: string): Promise<Conteiner | Error> {
    try {
      if (!this.maxMessages) {
        throw new BadRequestException(
          'Не установлено максимальное количество сообщений в контейнере',
        );
      }
      const exists = await this.messageRepo.exists({
        where: { message: newmessage },
      });
      if (exists) {
        throw new ConflictException('Такое сообщение уже существует');
      }
      const message = new Message();
      message.message = newmessage;
      const currentConteiner = await this.addMessageToConteiner(
        this.maxMessages,
      );
      message.conteiner = currentConteiner;
      await this.messageRepo.save(message);
      console.log(await this.getFullConteinierById(currentConteiner.id));
      return await this.getFullConteinierById(currentConteiner.id);
    } catch (e) {
      console.log(e);
      throw new ConflictException('Что то пошло не так');
    }
  }

  async getAllWithMessages(): Promise<Conteiner[]> {
    return this.conteinerRepo.find({
      relations: ['messages'],
      order: {
        id: 'ASC',
      },
    });
  }

  async getFullConteinierById(id: number) {
    const fullConteinier = await this.conteinerRepo
      .createQueryBuilder('conteiner')
      .leftJoinAndSelect('conteiner.messages', 'message')
      .where('conteiner.id = :id', { id: id })
      .getOneOrFail();
    return fullConteinier;
  }

  async addMessageToConteiner(maxMessages: number) {
    const oldConteiner: Conteiner | null = await this.conteinerRepo
      .createQueryBuilder('conteiner')
      .leftJoinAndSelect('conteiner.messages', 'message')
      .orderBy('conteiner.id', 'DESC')
      .getOne();

    if (oldConteiner && oldConteiner.messages.length < maxMessages) {
      return oldConteiner;
    } else {
      const newConteiner: Conteiner = this.conteinerRepo.create();
      return await this.conteinerRepo.save(newConteiner);
    }
  }
}
