import {  IsEnum, IsNotEmpty} from "class-validator";
import { Role } from "src/auth/roles.enum";

export class RolDto{

@IsEnum(Role)
@IsNotEmpty()
Rol: Role
}