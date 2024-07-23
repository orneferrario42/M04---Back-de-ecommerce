import {Entity,PrimaryGeneratedColumn,Column,OneToMany,JoinColumn,} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Order } from './order.entity';
import { Role } from 'src/auth/roles.enum';
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 72, nullable: false })
  password: string;

  @Column()
  birthdate: string; 
  
  @Column({ type: 'int', nullable: true})
  phone: number;

  @Column({ type: 'varchar', length: 50, nullable: true})
  country: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string;

  @Column({ default: Role.user})
  Rol: Role
  

  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders: Order[];
}
