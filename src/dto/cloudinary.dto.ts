import { ApiProperty } from "@nestjs/swagger";

export class UploadImageProductDto {

    @ApiProperty({
    description:'Suba la imagen',
    type: 'string',
    format: 'binary',  
    })
    imgUrl: string;
}