import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,ManyToMany,JoinColumn, OneToMany,} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Categorie } from './categories.entity';
import { OrderDetails } from './orderDetails.entity';
import { ApiHideProperty } from '@nestjs/swagger';


@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({ type: 'text', default: 'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg', nullable: false })
  imgUrl: string;

  @ApiHideProperty()
  @ManyToOne(() => Categorie, (category) => category.product)
  @JoinColumn({ name: 'category_id' })
  category: Categorie;

  @ApiHideProperty()
  @ManyToMany(() => OrderDetails, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetails[];

}
