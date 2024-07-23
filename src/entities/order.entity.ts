import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,OneToOne, JoinColumn,} from 'typeorm';
import { OrderDetails } from './orderDetails.entity';
import { User } from '../entities/user.entity';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetail) => orderDetail.order)
  orderDetail: OrderDetails;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({name: 'user_id'})
  user: User;
}
