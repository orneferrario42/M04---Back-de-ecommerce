import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsInt, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Order } from 'src/entities/order.entity';
import{v4 as uuidv4} from 'uuid';

export class PutUserDto {

    @ApiHideProperty()
    @IsNotEmpty()
    id: string = uuidv4();

    @ApiHideProperty()
    orders: Order[];


@IsString()    
@MinLength(3)
@MaxLength(80)
name?: string;


@ApiHideProperty()
@IsEmpty()
@IsEmail()
email: string;


/**
 * La contraseña, debe ser una difícil
 * @example Ej3mpl0!#
 */
@ApiHideProperty()
@MinLength(8)
@MaxLength(15)
@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
    message: 'La contraseña debe contener al menos una minúscula, una mayúscula, un número y un caractere especial',
})
password: string;


@ApiHideProperty()
@IsString()
@MinLength(3)
@MaxLength(80)
address?: string;

@ApiProperty()
@IsInt()
phone?: number;

@ApiProperty()
@IsString()
@MinLength(5)
@MaxLength(20)
country?: string;

@ApiProperty()
@IsString()
@MinLength(5)
@MaxLength(20)
city?: string;



}   