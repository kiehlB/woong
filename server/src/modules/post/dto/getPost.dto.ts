import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Tag } from 'src/modules/tag/entity/tag.entity';

@InputType('getPost')
export class getSinglePostRequest {
  @Field((type) => Int, { nullable: true })
  id: number;
}

@ObjectType()
export class getPostResponse {
  @Field((type) => String, { nullable: true })
  @IsString()
  title?: string;

  @Field((type) => String, { nullable: true })
  @IsString()
  body?: string;

  @Field((type) => String, { nullable: true })
  thumbnail?: string;

  @Field((type) => [Tag], { nullable: true })
  tags?: Tag[];

  @Field((type) => String, { nullable: true })
  @IsString()
  difficulty?: string;

  @Field((type) => Boolean)
  liked!: Boolean;
}
