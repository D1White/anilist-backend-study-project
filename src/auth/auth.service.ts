import { compare } from 'bcrypt';
import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UserService } from 'user/user.service';
import { User, UserDocument } from 'user/schemas/user.schema';
import { CreateUserDto } from 'user/dto/create-user.dto';
import { ListService } from 'list/list.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private listService: ListService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.userModel.findOne({ email }).exec();

    const match = await compare(pass, user.password);

    if (user && match) {
      this.logger.info('auth-service validateUser [SUCCESS]');
      return user;
    }
    this.logger.warn('auth-service validateUser [FAILED]');
    return null;
  }

  async login(user: UserDocument) {
    const payload = { sub: user._id, email: user.email, role: user.role };
    this.logger.info('auth-service login', { user: { id: user._id, email: user.email } });
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);

    const emptyList = {
      user_id: newUser._id,
      current: [],
      planning: [],
      completed: [],
      paused: [],
      dropped: [],
    };
    await this.listService.create(emptyList);

    return await this.login(newUser);
  }
}
