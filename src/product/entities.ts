import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Money } from '../financial/entities';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column(() => Money)
  public price!: Money;
  // embeddable entity
}
