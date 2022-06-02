import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateTagRequest {
  @IsNotEmpty()
  @Field((type) => String)
  value: string;

  @Field((type) => String)
  @IsNotEmpty()
  label: string;
}
