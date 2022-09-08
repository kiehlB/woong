import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('createPostLike')
export class CreatePostLikeRequest {
  @Field((type) => Int, { nullable: true })
  @IsString()
  id?: number;
}
