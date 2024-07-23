import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { createCateoriesDto } from 'src/dto/create.categories.dto';
import { RolesGuards } from 'src/auth/guards/roles.guards';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/Decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';


@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('seeder')
  async addCategories() {
    return await this.categoriesService.addCategories();
  }

  @Get()
  async getCategories(){
    return await this.categoriesService.getCategories();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuards)
  @Roles(Role.Admin)
  @Post()
  async createCategories(@Body() categories: createCateoriesDto){
    return this.categoriesService.createCategories(categories)
  }
  
}
