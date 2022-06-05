import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('craeteArtice')
export class CreatePostRequest {
  @Field((type) => String)
  @IsString()
  title?: string;
}

@ObjectType()
export class CreatePostResponse {
  @Field((type) => String)
  title!: string;
}
