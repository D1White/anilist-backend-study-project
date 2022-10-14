import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type ListDocument = List & Document;

@Schema()
export class List {
  @Prop({ required: true, type: mongoose.SchemaTypes.ObjectId, ref: 'User' })
  user_id: string;

  @Prop({ required: true, type: [mongoose.SchemaTypes.Number] })
  current: number[];

  @Prop({ required: true, type: [mongoose.SchemaTypes.Number] })
  planning: number[];

  @Prop({ required: true, type: [mongoose.SchemaTypes.Number] })
  completed: number[];

  @Prop({ required: true, type: [mongoose.SchemaTypes.Number] })
  paused: number[];

  @Prop({ required: true, type: [mongoose.SchemaTypes.Number] })
  dropped: number[];
}

export const ListSchema = SchemaFactory.createForClass(List);
