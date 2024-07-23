import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class createProductDto {

@IsString()
@IsNotEmpty()
@MaxLength(100)
name: string;

@IsString()
@IsNotEmpty()
@MaxLength(100)
description: string;


@IsNumber()
@IsNotEmpty()
price: number;


@IsNumber()
@IsNotEmpty()
stock: number;


@IsOptional()
@IsNotEmpty()
imgUrl: string;


@IsUUID()
@IsNotEmpty()
category: string
}

export class updateProductDto extends PartialType(createProductDto){};
