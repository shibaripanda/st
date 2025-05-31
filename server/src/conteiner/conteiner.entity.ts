// src/user/user.entity.ts
import { Message } from 'src/message/message.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Conteiner {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'conteiner_id',
  })
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Message, (message) => message.conteiner)
  messages: Message[];
}
