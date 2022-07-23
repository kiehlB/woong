import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('craetePost')
export class CreatePostRequest {
  @Field((type) => String)
  @IsString()
  title?: string;

  @Field((type) => String)
  @IsString()
  body?: string;

  @Field((type) => String)
  @IsString()
  thumbnail?: string;

  @Field((type) => [String])
  @IsString()
  tags?: string;
}

@ObjectType()
export class CreatePostResponse {
  @Field((type) => String)
  title!: string;
}
