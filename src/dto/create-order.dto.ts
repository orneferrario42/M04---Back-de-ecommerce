import { ApiHideProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { ProductDto } from "./product.dto";

export class CreateOrderDto {
    
    @IsUUID()
    userId: string;

    // @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    products: ProductDto[];
}
