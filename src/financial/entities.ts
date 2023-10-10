import { Column } from "typeorm";

export class Money {
    @Column("integer")
    amount!: number; 

    @Column()
    currency!: string;
}
