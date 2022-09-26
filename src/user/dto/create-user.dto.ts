import { IsEmail, MinLength, IsUrl, IsOptional, IsEnum } from 'class-validator';
import { UserRoles } from '../types';

export class CreateUserDto {
  @MinLength(2, {
    message: 'Name is too short',
  })
  name: string;

  @IsEmail({
    message: 'Invalid email',
  })
  email: string;

  @MinLength(5, {
    message: 'Minimum password length 5 characters',
  })
  password: string;

  @IsOptional()
  @IsUrl({
    message: 'Invalid avatar link',
  })
  avatar: string;

  @IsEnum(
    {
      user: 'user',
      admin: 'admin',
    },
    {
      message: 'Valid user roles: user or admin',
    },
  )
  role: UserRoles;
}
