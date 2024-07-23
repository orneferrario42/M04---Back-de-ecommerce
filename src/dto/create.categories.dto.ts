import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class createCateoriesDto{

    /**
     * nombre de la propiedad
     * @example 'Perfumeria
     */
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string

}