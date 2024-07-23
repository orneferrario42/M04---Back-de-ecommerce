import { Module } from '@nestjs/common';
import { UsersDbService } from '../users/userDB.service';
import { UserController } from './users.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';



@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, ],
  providers: [UsersDbService, UserRepository],
})
export class UsersModule {}
