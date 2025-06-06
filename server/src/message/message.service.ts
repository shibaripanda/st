import {
  BadRequestException,
  ConflictException,
  HttpException,
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
    console.log('connect', this.maxMessages);
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
      return await this.getFullConteinierById(currentConteiner.id);
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new ConflictException('Что то пошло не так');
    }
  }

  async findContIdByMessage(message: string) {
    const mes = await this.messageRepo.findOne({
      where: { message },
      relations: ['conteiner'],
    });
    return mes ? mes.conteiner.id : null;
  }

  async getContsCount(): Promise<number> {
    return await this.conteinerRepo.count();
  }

  async getMessagesCount(): Promise<number> {
    return await this.messageRepo.count();
  }

  async getAllWithMessages(
    limit: number,
    offset: number,
  ): Promise<{ data: Conteiner[]; total: number }> {
    const [data, total]: [Conteiner[], number] =
      await this.conteinerRepo.findAndCount({
        relations: ['messages'],
        order: {
          createdAt: 'DESC',
        },
        skip: offset,
        take: limit,
      });
    return { data, total };
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
