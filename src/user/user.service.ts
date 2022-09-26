import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './types';
import { ErrorsEnum, getEntityById } from 'utils/index';

@Injectable()
export class UserService {
  private users: IUser[] = [
    {
      id: 1,
      name: 'Test',
      email: 'tes@gamil.com',
      password: 'qwerty',
      avatar: null,
      role: 'admin',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const [user] = getEntityById<IUser>(id, this.users);

    if (!user) {
      throw new HttpException(ErrorsEnum.userNotFound, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const newUser = { id: Date.now(), ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const [user, filterUsers] = getEntityById<IUser>(id, this.users);

    if (!user) {
      throw new HttpException(ErrorsEnum.userNotFound, HttpStatus.NOT_FOUND);
    }

    const updatedUser = { ...user, ...updateUserDto };
    this.users = [...filterUsers, updatedUser];
    return updatedUser;
  }

  remove(id: number) {
    const [user, filterUsers] = getEntityById<IUser>(id, this.users);

    if (!user) {
      throw new HttpException(ErrorsEnum.userNotFound, HttpStatus.NOT_FOUND);
    }

    this.users = filterUsers;
  }
}
