import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { orderRepository } from './order.repository';

@Injectable()
export class OrderService {
    constructor(private readonly orderRepository: orderRepository){}
    
    async addOrder(CreateOrderDto: CreateOrderDto) {
    return  await this.orderRepository.addOrder(CreateOrderDto);
    }
getOrder(id: string) {
    return this.orderRepository.getOrder(id);
}

}
