import {BadRequestException,Body,Controller,Get,HttpException,HttpStatus,Post,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/LoginUserDto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('SignIn/SignUp')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


/**SOLICITUD SIGING */
  @Post('signin')
  signIn(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
return  this.authService.signIn(loginUserDto);
  
  }


  /**SOLICITUD DE REGISTRO SIGNUP */
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const { password, confirmPassword } = createUserDto;

    /** VALIDACION */
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    /**CREA USER */
    const userCreated = await this.authService.signUp(createUserDto);

    /**Retorna sin estas propiedades */
    delete userCreated.password,
    delete userCreated.confirmPassword,
    delete userCreated.Rol;
    return userCreated;
  }
}