import { Inject, Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categorie } from "src/entities/categories.entity";
import { Product } from "src/entities/product.entity";
import { Repository } from "typeorm";
import * as data from '../utils/data.json';
import { createProductDto, updateProductDto } from "src/dto/create-product.dto";

@Injectable()
export class ProductRepository {
    
    constructor(@InjectRepository (Product) private readonly productRepository: Repository<Product>,
@InjectRepository(Categorie) private readonly categoriesRepository: Repository<Categorie>){}


    async getProducts(page: number, limit: number): Promise<Product[]> {
        let products = await this.productRepository.find({relations: {
            category: true,
        },
    });
        const start = (page - 1) * limit;
        const end = products.slice(start, start + limit);
        return end;
    }

    async getProductById(id: string) {
        const product = await this.productRepository.findOneBy({ id });
        if (!product){
            return `producto con id ${id} no encontrado`;
        }
        return product;
    }

    async createProduct(product:createProductDto){
    const {name, description, price, stock, imgUrl, category: categoryId} = product
        const findcategory = await this.categoriesRepository.findOne({where: {id: categoryId}})
        if(!findcategory) throw new Error (`la categoria con id ${categoryId} no fue encontrada `) 
        const creaproduct = this.productRepository.create({name, description, price, stock, imgUrl, category: findcategory })
        return await this.productRepository.save(creaproduct);
    }
    

    /**seeder */
    async addProducts(){
        const categories = await this.categoriesRepository.find()
        data?.map(async(element)=>{
            const category = categories.find((category) => category.name === element.category,
        );
            
            const product = new Product();

            product.name = element.name;
            product.description = element.description;
            product.price = element.price;
            product.imgUrl = element.imgUrl;
            product.stock = element.stock;
            product.category = category;

            await this.productRepository
            .createQueryBuilder()
            .insert()
            .into(Product)
            .values(product)
            .orUpdate(['description', 'price', 'stock', 'imgUrl'], ['name'])
            .execute()
        });
        console.log(data)
        return 'Se agregaron correctamente los productos';
    }
    
    async updateProducts(id: string, updateproductDto: updateProductDto) {

        const updateProduct = await this.productRepository.findOne({ where: {id} });
        if (!updateProduct)
            throw new NotFoundException(`Producto con ${id} no encontrado`);
        const product = Object.assign(updateProduct, updateproductDto);
        return await this.productRepository.save(product);
    }

    deleteProduct(id: string) {
        return this.productRepository.delete(id);
    }
    
};
