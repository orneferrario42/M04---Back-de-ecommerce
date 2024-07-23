import { Injectable, Query } from '@nestjs/common';
import { UserRepository } from './user.repository';
import IUser from 'src/interfaces/IUser';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { PutUserDto } from 'src/dto/put-user.dto';


@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getUsers( page: number, limit: number): Promise<User[]> {
    return await this.userRepository.getUsers(page, limit);
  }
  // get(page: number, limit: number) {
  //   return this.userRepository.getUsers(page, limit);
  // }
  getUsersById(id: string) {
    return this.userRepository.getUserId(id);
  }
  createUser(user: CreateUserDto) {
    return this.userRepository.createUser(user);
  }
  updateUser(id:string, user: User) {
    return this.userRepository.updateUser(id, user);
  }
  deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
  }

