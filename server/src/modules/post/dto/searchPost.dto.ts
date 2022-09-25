import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('searchPost')
export class SearchPostRequest {
  @Field((type) => String, { nullable: true })
  @IsString()
  text?: string;
}
