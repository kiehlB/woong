import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('getPost')
export class getSinglePostRequest {
  @Field((type) => Int, { nullable: true })
  id: number;
}
