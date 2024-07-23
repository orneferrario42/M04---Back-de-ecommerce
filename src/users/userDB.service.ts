import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PutUserDto } from "src/dto/put-user.dto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { UserRepository } from "./user.repository";
import { Role } from "src/auth/roles.enum";
import { RolDto } from "src/dto/rol.dto";
import { CreateUserDto } from "src/dto/create-user.dto";

@Injectable()
export class UsersDbService{
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}
    
    async getUsers(page: number, limit: number) {
        const user = await this.usersRepository.find({skip: (page - 1) * limit, take: limit});
        return user;
        }
        
    async changeRol(id: string, Rol: RolDto){
            const userRolId = await this.usersRepository.findOneBy({id});
            userRolId.Rol = Rol.Rol
            await this.usersRepository.update(id, userRolId)
            return userRolId
            }
            
    async getUsersById(id: string) {
        return await this.usersRepository.findOneBy({id});
        }
                
        
    async  updateUser(id: string, body: Partial<CreateUserDto>) {
        await this.usersRepository.update({ id }, body)
        return  'usuario actualizado'
        }
    async deleteUser(id: string) {
        return await this.usersRepository.delete({id});
        }

    /**validar AuthService */
        async findByEmail(email: string): Promise<User> {
        return this.usersRepository.findOneBy({email: email});
        }
        async saveUser(user: any){
        return await this.usersRepository.save(user);
        }
    
}