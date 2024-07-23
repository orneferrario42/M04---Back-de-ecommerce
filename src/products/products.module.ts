import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductRepository } from './product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Categorie } from 'src/entities/categories.entity';
import { cloudinaryConfig } from 'src/config/cloudinary';
import { cloudinaryRepository } from 'src/cloudinary/cloudinary.repository';




@Module({
  imports: [TypeOrmModule.forFeature([Product, Categorie]),],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository, cloudinaryConfig, cloudinaryRepository],
})
export class ProductsModule {}
