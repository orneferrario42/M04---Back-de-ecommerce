import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async addOrder(@Body() createOrderDto: CreateOrderDto) { //createOrderDto: CreateOrderDto
    // const {userId, products} = createOrderDto; 
    return await this.orderService.addOrder(createOrderDto); 
  }

  @Get(':id')
  getOrder(@Param('id') id:string){
    return this.orderService.getOrder(id);
  }


}
