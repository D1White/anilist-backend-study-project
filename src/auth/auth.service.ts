import { compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'user/user.service';
import { SecureUser, SecureUserDocument } from 'user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<SecureUser | null> {
    const user = await this.userService.userModel.findOne({ email }).exec();

    const match = await compare(pass, user.password);

    if (user && match) {
      return user;
    }
    return null;
  }

  async login(user: SecureUserDocument) {
    const payload = { sub: user._id, email: user.email, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
