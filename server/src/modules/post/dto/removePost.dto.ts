import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('removePost')
export class RemovePostRequest {
  @Field((type) => Int, { nullable: true })
  user_id?: number;

  @Field((type) => Int, { nullable: true })
  post_id?: number;
}

@ObjectType()
export class EditPostResponse {
  @Field((type) => String)
  title!: string;
}
