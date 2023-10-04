import { Entity } from 'typeorm';

@Entity()
export class Money {
  amount!: number;
  currency!: string;
}