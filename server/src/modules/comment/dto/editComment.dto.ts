import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('editComment')
export class EditCommentRequest {
  @Field()
  @IsString()
  @IsNotEmpty()
  text: string;

  @Field((type) => Int, { nullable: true })
  comment_id!: number;
}

@InputType('deleteComment')
export class DeleteCommentRequest {
  @Field((type) => Int, { nullable: true })
  comment_id!: number;
}
