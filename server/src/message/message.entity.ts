// src/user/user.entity.ts
import { Conteiner } from 'src/conteiner/conteiner.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'message_id',
  })
  id: number;

  @Column()
  message: string;

  @ManyToOne(() => Conteiner, (conteiner) => conteiner.messages)
  conteiner: Conteiner;
}
