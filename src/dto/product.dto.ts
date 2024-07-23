import { IsNotEmpty, IsUUID } from "class-validator";

export class ProductDto{


    @IsUUID()
    @IsNotEmpty()
    id: string 

    
}