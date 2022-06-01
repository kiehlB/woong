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

  @Field((type) => [String], { nullable: true })
  tags?: string[];

  @Field()
  @IsString()
  cover?: string;

  @Field()
  @IsString()
  content?: string;

  @Field()
  @IsString()
  status?: string;
}

@ObjectType()
export class CreatePostResponse {
  @Field((type) => String)
  title!: string;

  @Field()
  cover!: string;

  @Field()
  content!: string;
}
