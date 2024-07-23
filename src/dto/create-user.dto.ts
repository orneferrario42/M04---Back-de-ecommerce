import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsInt, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Role } from 'src/auth/roles.enum';
import { Order } from 'src/entities/order.entity';
import { v4 as uuidv4 } from 'uuid';
export class CreateUserDto {
@ApiHideProperty()
id: string = uuidv4();

@IsNotEmpty()
@MinLength(3)
@MaxLength(80)
@ApiProperty({
    description: 'El nombre del usuario debe tener minimo 3 caracteres',
    example: 'ESTO ES UN EJEMPLO',
})
name: string;


@ApiProperty({
    description: 'Introduzca su correo electronico',
    example: 'ejemplo@mail.com',
})
@IsNotEmpty()
@IsEmail()
email: string;

@IsNotEmpty()
@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
    message: 'La contraseña debe contener al menos una minúscula, una mayúscula, un número y un caractere especial',
    })
    @ApiProperty({
        description: 'La contraseña debe tener al menos 8 caracteres',
        example: 'Ej3mpl0!#',
    })
password: string;


@IsNotEmpty()
@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
    message: 'La contraseña debe contener al menos una minúscula, una mayúscula, un número y un caractere especial',
    })
    @ApiProperty({
        description: 'Repita la contraseña',
        example: 'Ej3mpl0!#',
    })
    confirmPassword: string;

@ApiProperty({
    description: 'Introduzca su fecha de nacimiento',
    example: '09/10/1999'
})
@IsString()
birthdate: string;

@ApiProperty({
    description: 'Numero de telefono',
    example: '00123456',
})
@IsNotEmpty()
@IsNumber()
phone: number;

@ApiProperty({
    description: 'Pais',
    example: 'Australia',
})
@IsNotEmpty()
@MinLength(5)
@MaxLength(20)
country: string;

@ApiProperty({
    description: 'Direccion',
    example: 'Calle falsa 123',
})
@IsNotEmpty()
@MinLength(3)
@MaxLength(80)
address: string;

@ApiProperty({
    description: 'Ciudad',
    example: 'City',
})
@IsNotEmpty()
@MinLength(5)
@MaxLength(20)
city: string;

@ApiHideProperty()
orders: Order[];

}