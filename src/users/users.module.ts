import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [UserEntity, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserController, UserService],
  exports: [UserService]
})
export class UsersModule { }
