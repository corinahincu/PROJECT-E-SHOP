import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Money } from '../financial/entities';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column(() => Money)
  price!: Money;
  // embeddable entity
}
