import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersDbService } from '../users/userDB.service';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/dto/LoginUserDto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userDbService: UsersDbService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: Partial<User>) {
    const userExists = await this.userDbService.findByEmail(user.email);

    if (userExists) {
      throw new BadRequestException('El email ya existe');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    
    if (!hashedPassword) {
      throw new BadRequestException('Credenciales incorrectas');
    }
    const newUser = await this.userDbService.saveUser({
      ...user,
      password: hashedPassword,
    });

    return newUser;
  }


  /**LOGICA DE SIGNIN */
  async signIn(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userDbService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Credenciales incorrectas');
    }

    const payload = { id: user.id, email: user.email, Rol: user.Rol };
    const token = this.jwtService.sign(payload);

    return {
      success: 'Inicio de sesión exitoso',
      TuToken: token
    };
  }
}