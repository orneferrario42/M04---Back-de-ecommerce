import {Entity,PrimaryGeneratedColumn,Column,ManyToMany,JoinTable,OneToOne,JoinColumn,} from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'order_details',
})
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;


  //RELACIONES 
  @OneToOne(() => Order, (order) => order.orderDetail)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'order_details_products',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'orderDetail_id',
      referencedColumnName: 'id',
    },
  })
  products: Product[];
}

