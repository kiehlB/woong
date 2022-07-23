import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('createComment')
export class CreateCommentRequest {
  @Field()
  @IsString()
  @IsNotEmpty()
  text: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  post_id: string;

  @Field((type) => String, { nullable: true })
  comment_id!: string;
}
