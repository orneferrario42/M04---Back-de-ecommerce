import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { createCateoriesDto } from 'src/dto/create.categories.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository){}


  async createCategories(categories: createCateoriesDto){
    return await this.categoriesRepository.createCategories(categories)
  }
  addCategories() {
    return this.categoriesRepository.CategoriesSeeder();
  }
  getCategories() {
    return this.categoriesRepository.getCategories();
  }
  
}
