import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { Order } from 'src/entities/order.entity';
import { User } from 'src/entities/user.entity';
import { Product } from 'src/entities/product.entity';
import { CreateOrderDto } from 'src/dto/create-order.dto';

@Injectable()
export class orderRepository {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(OrderDetails) private orderDetailsRepository: Repository<OrderDetails>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
    ) { }

    async addOrder(shop: CreateOrderDto) {
        
        try {
            let total = 0;
            const user = await this.userRepository.findOneBy({ id: shop.userId });
            if (!user) throw new NotFoundException(`Usuario con id ${shop.userId} no encontrado`);
                
            const order = new Order();
            order.date = new Date();
            order.user = user;
            const newOrder = await this.orderRepository.save(order);

            const productsArray = await Promise.all(
                
                shop.products.map(async (element) => {

                    const product = await this.productRepository.findOneBy({ id: element.id });
        
                    if (!product) throw new NotFoundException(`Producto con id ${element.id} no encontrado`);
                    if (product.stock === 0) throw new NotFoundException(` Prdocucto Sin Stock ${element.id} , no se puede crear la orden`);
                    
                    total += Number(product.price)
                    await this.productRepository.update(
                        { id: element.id },
                        { stock: product.stock - 1 },
                    );

                    return product
                }),
            );
            const orderDetail = new OrderDetails();
            orderDetail.price = Number(Number(total).toFixed(2));
            orderDetail.products = productsArray;
            orderDetail.order = newOrder;
            await this.orderDetailsRepository.save(orderDetail);

            return await this.orderRepository.find({
                where: { id: newOrder.id },
                relations: {
                    orderDetail: true,
                },
            });

        } catch (error: any) {
            if (error instanceof NotFoundException){
            throw error
            } else { throw new InternalServerErrorException(error) }
        }
    }

    getOrder(id: string) {
        const order = this.orderRepository.findOne({
            where: { id },
            relations: {
                orderDetail: {
                    products: true,
                },
            },
        });
        if (!order) {
            throw new NotFoundException(`order con id ${id} no encontrado`);
        }
        return order;
    }
}