import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  managerId: number;

  @ManyToOne(() => User, (user) => user.subordinates)
  manager: User;

  @OneToMany(() => User, (user) => user.manager)
  subordinates: User[];
}
