import { Injectable, OnModuleInit } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import IProduct from 'src/interfaces/IProduct';
import { Product } from 'src/entities/product.entity';
import { createProductDto, updateProductDto } from 'src/dto/create-product.dto';


@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}
  

  getProducts(page: number, limit: number) {
    return this.productRepository.getProducts(page, limit);
  }

  createProduct(product: createProductDto){
    return this.productRepository.createProduct(product);

  }
  

  /**SEEDER */
  addProducts() {
    return this.productRepository.addProducts();
  }
  
  getProductById(id: string) {
    return this.productRepository.getProductById(id);
  }
  
  updateProduct(id: string, product: updateProductDto) {
    return this.productRepository.updateProducts(id, product);
  }
  deleteProduct(id: string) {
    return this.productRepository.deleteProduct(id);
  }
  
}
