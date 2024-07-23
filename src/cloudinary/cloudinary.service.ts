import { Injectable, NotFoundException } from "@nestjs/common";
import { cloudinaryRepository } from "../cloudinary/cloudinary.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../entities/product.entity";
import { Repository } from "typeorm";


@Injectable()
export class cloudinaryService {
    constructor(
    private readonly cloudinaryRepository: cloudinaryRepository,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
) {}

async uploadImage(file: Express.Multer.File, productId: string) {
    //verificamos que exista un producto
    const product = await this.productRepository.findOneBy({id: productId});
    
    if(!product) throw new NotFoundException(`Producto con id ${productId} no encontrado`)

        //Si el producto existe => Peticion a Cloudinary
    const response = await this.cloudinaryRepository.uploadImagen(file);
    
    //Modificar BBDD
    await this.productRepository.update(productId,{
        imgUrl: response.secure_url,
    });

    // const foundProduct = this.productRepository.findOneBy({id: productId});
    // console.log(foundProduct)
    return product;
}
}