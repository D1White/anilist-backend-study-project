import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { UserRoles } from '../types';

export type SecureUserDocument = Omit<UserDocument, 'password'>;

export type UserDocument = User & Document;

export type SecureUser = Omit<User, 'password'>;

@Schema()
export class User {
  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  name: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  email: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  password: string;

  @Prop({ type: mongoose.SchemaTypes.String })
  avatar: string;

  @Prop({
    required: true,
    type: mongoose.SchemaTypes.String,
    enum: [UserRoles.user, UserRoles.admin],
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
