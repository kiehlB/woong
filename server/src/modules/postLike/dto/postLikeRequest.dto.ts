import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('createPostLIke')
export class CreatePostLikeRequest {
  @Field((type) => Int, { nullable: true })
  @IsString()
  id?: number;
}

@ObjectType()
export class CreatePostResponse {
  @Field((type) => String)
  title!: string;
}
