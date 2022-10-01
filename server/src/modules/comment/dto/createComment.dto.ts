import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('createComment')
export class CreateCommentRequest {
  @Field()
  @IsString()
  @IsNotEmpty()
  text: string;

  @Field()
  @IsNotEmpty()
  post_id: number;

  @Field((type) => Int, { nullable: true })
  comment_id!: number;
}

@InputType('deleteComment')
export class DeleteCommentRequest {
  @Field((type) => Int, { nullable: true })
  comment_id!: number;
}
