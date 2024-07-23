import { Module } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { cloudinaryRepository } from './cloudinary.repository';
import { cloudinaryController } from './cloudinary.controller';
import { cloudinaryService } from './cloudinary.service';
import { cloudinaryConfig } from 'src/config/cloudinary';


@Module({
imports: [TypeOrmModule.forFeature([Product])],
controllers: [cloudinaryController],
providers: [cloudinaryService,cloudinaryConfig, cloudinaryRepository],
})
export class cloudinaryModule {}
