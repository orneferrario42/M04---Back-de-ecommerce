import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorie } from 'src/entities/categories.entity';
import { CategoriesRepository } from './categories.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Categorie])],
  controllers: [CategoriesController],
  providers: [CategoriesService,CategoriesRepository],
})
export class CategoriesModule {}
