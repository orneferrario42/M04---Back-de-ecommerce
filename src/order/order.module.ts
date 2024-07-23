import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { orderRepository } from './order.repository';
import { User } from 'src/entities/user.entity';
import { Product } from 'src/entities/product.entity';
import { Order } from 'src/entities/order.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Order, OrderDetails,User,Product ])],
  controllers: [OrderController],
  providers: [OrderService, orderRepository],
})
export class OrderModule {}
