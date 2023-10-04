import { Column } from "typeorm/index.js";

export class Money {
    @Column("integer")
    amount!: number; 

    @Column()
    currency!: string;
}
