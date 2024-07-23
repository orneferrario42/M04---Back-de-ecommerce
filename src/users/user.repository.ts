import { Inject, Injectable, InternalServerErrorException, NotFoundException, OnModuleInit, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/dto/create-user.dto";
import { PutUserDto } from "src/dto/put-user.dto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Role } from "src/auth/roles.enum";

@Injectable()
export class UserRepository implements OnModuleInit{

    constructor ( @InjectRepository(User) private readonly userRepository: Repository<User>){
    }
    async onModuleInit() {
      try {
        const Admin = await this.userRepository.findOne({
          where: { email: 'orne@mail.com' },
        });
        if (!Admin) {
          const hashedPassword = await bcrypt.hash('Str0ngP@ss!', 10);
          return await this.userRepository.save({
            name: 'Orne',
            email: 'orne@mail.com',
            password: hashedPassword,
            address: 'calle falsa 123',
            birthdate: "09/10/1999",
            phone: 123456,
            country: 'Argentina',
            city: 'Resistencia',
            Rol: Role.Admin,
          });
        }
        return;
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
  
    }
  async getUsers( page: number,limit: number) {
        const start = (page - 1) * limit;
        const end = await this.userRepository.find({
          take: limit,
          skip: start,
        });
    
        return end;
    }
    getUserByEmail(email: string) {
        return this.userRepository.findOne({where: {email} });
    }
    
    async getUserId(id:string) {
        const idUSer = await this.userRepository.findOne({
          where: { id }, 
            relations:{
            orders: true,
            },
        });
        if (!idUSer) throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        const { password, ...userNoPassword } = idUSer;
        return userNoPassword;
    }
    
    async createUser(user: CreateUserDto):Promise<Partial<User>> {
        const newUser = await this.userRepository.save(user);
        const {password, ...userNoPassword } = newUser;
        return userNoPassword;
      }
      async updateUser(id: string, user: User){
        await this.userRepository.update(id, user);
        const updatedUser = await this.userRepository.findOneBy({ id });
        if (!updatedUser)
          throw new NotFoundException(`usuario con id ${id} no encontrado`);
    
        const { password, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
      }
    
      async deleteUser(id: string):Promise<Partial<User>> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new NotFoundException(`usuario con id ${id} no encontrado`);
        this.userRepository.remove(user);
        const { password, ...userNoPassword } = user;
        return userNoPassword;
      }
};
