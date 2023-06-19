import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@Entity('books')
class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    bookName!: string;

    @ManyToOne(() => User, (user) => user.books)
    user!: User;
}

export default Book;
