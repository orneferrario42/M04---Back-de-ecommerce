import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categorie } from "src/entities/categories.entity";
import { Repository } from "typeorm";
import * as data from '../utils/data.json';
import { createCateoriesDto } from "src/dto/create.categories.dto";
@Injectable()
export class CategoriesRepository{
    constructor(
        @InjectRepository(Categorie) private categoriesRepository: Repository<Categorie>
    ){}

async getCategories(){
    return await this.categoriesRepository.find();
    }

    async createCategories(categories: createCateoriesDto){
        const newCategories = this.categoriesRepository.create(categories)
        return await this.categoriesRepository.save(newCategories)
    }

    /**SEEDER */
async CategoriesSeeder(){
    data?.map(async(element) =>{
        await this.categoriesRepository

        .createQueryBuilder()   // creador dequery builder para insertar la categoria
        .insert() // insertar en la base de datos
        .into(Categorie) //en la entidad de la categoria 
        .values({name: element.category}) //aca inserto el nombre de la categoria y se compara el valor con la bd
        .orIgnore() // y si ya existe el nombre de categhoria, que omita la creacion de la categoria
        .execute() //ejecuar el query builder

    });
    return 'Categoria agregada correctamente'; //retorna que la categoria se agregó
}

}