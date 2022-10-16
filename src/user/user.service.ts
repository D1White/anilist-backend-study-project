import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ErrorsEnum } from 'utils/index';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) public userModel: Model<UserDocument>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async findAll() {
    this.logger.info(`user-service findAll`);
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      this.logger.warn(`[${HttpStatus.NOT_FOUND}] user-service findOne`);
      throw new HttpException(ErrorsEnum.notFound, HttpStatus.NOT_FOUND);
    }

    this.logger.info(`user-service findOne`);
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    await this.userExists(createUserDto.email);

    const hashPassword = await hash(createUserDto.password, 7);
    const createdUser = new this.userModel({ ...createUserDto, password: hashPassword });
    this.logger.info(`user-service create`);
    return createdUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      this.logger.warn(`[${HttpStatus.NOT_FOUND}] user-service update`);
      throw new HttpException(ErrorsEnum.notFound, HttpStatus.NOT_FOUND);
    }

    if (updateUserDto?.email && updateUserDto?.email !== user.email) {
      await this.userExists(updateUserDto.email);
    }

    const hashPassword = await hash(updateUserDto.password, 7);

    this.logger.info(`user-service update`);
    return this.userModel
      .findByIdAndUpdate(id, { ...updateUserDto, password: hashPassword }, { new: true })
      .exec();
  }

  async remove(id: string) {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      this.logger.warn(`[${HttpStatus.NOT_FOUND}] user-service remove`);
      throw new HttpException(ErrorsEnum.notFound, HttpStatus.NOT_FOUND);
    }

    this.logger.info(`user-service remove`);
    return this.userModel.findByIdAndDelete(id);
  }

  async userExists(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (user) {
      this.logger.warn(`[${HttpStatus.FORBIDDEN}] user-service userExists`);
      throw new HttpException(ErrorsEnum.userExists, HttpStatus.FORBIDDEN);
    }
  }
}
