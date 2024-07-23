import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, Req, UseGuards, UsePipes } from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { IsUUID } from 'class-validator';
import { Transform, plainToInstance } from 'class-transformer';
import { PutUserDto } from 'src/dto/put-user.dto';
import { cloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UsersDbService } from './userDB.service';
import { Roles } from 'src/Decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuards } from 'src/auth/guards/roles.guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotFoundError } from 'rxjs';
import { RolDto } from 'src/dto/rol.dto';


@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userDbService: UsersDbService
  ) {}

  
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuards)
  async getUsers(@Query('page') page: number, @Query('limit') limit: number) {
  if (page && limit) {
    return this.userDbService.getUsers(page,limit);
  }
  return this.userDbService.getUsers(page,limit);
  }


  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuards)
  @UsePipes()
  async getUsersById(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userDbService.getUsersById(id);
    if(!user) throw new NotFoundException('USUARIO NO ENCONTRADO')
      const { password, Rol, ...userSinPassword} = user
  return userSinPassword

  }
  
  @Put('rol/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuards)
  async changeRol(@Param('id', ParseUUIDPipe) id: string, @Body() Rol: RolDto){
    return this.userDbService.changeRol(id, Rol)
  }

  
  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() body: Partial<CreateUserDto>) {
    return this.userDbService.updateUser(id, body);
  }


  @Delete(':id')
  @UsePipes()
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userDbService.deleteUser(id);
  }
}
