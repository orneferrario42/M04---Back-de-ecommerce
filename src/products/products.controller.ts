import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Product } from 'src/entities/product.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuards } from 'src/auth/guards/roles.guards';
import { Roles } from 'src/Decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { createProductDto, updateProductDto } from 'src/dto/create-product.dto';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}


/**SOLICITUD GET */
  
  @Get('seeder')
  addProducts(){
    return this.productService.addProducts();
    }
    
    @Get()
    getProducts(@Query('page') page: string, @Query('limit') limit: string) {
        return this.productService.getProducts(Number(page), Number(limit));
    }
  @Get(':id')
  @UsePipes()
  getProductById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productService.getProductById((id));
  }

/**OLICITUD POST */
@ApiBearerAuth()
@Roles(Role.Admin)
@UseGuards(AuthGuard,RolesGuards)
@Post()
createProduct(@Body() createProduct: createProductDto){
  return this.productService.createProduct(createProduct);
}



  /**SOLICITUD PUT */
  @Put(':id')
  @Roles(Role.Admin)
@UseGuards(AuthGuard, RolesGuards)
  updateProduct(@Param('id') id: string, @Body() body: updateProductDto) {
    return this.productService.updateProduct((id), body);
  }


  /**SOLICITUD DELETE */
  @Delete(':id')
  @UseGuards(AuthGuard)
  @UsePipes()
  deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productService.deleteProduct((id));
  }

}