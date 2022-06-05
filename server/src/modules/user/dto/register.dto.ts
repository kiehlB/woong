import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';

@InputType('registerInput')
export class RegisterRequest {
  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  email: string;
}

@ObjectType()
export class RegisterResponse {
  @Field(() => Int)
  id: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  email_verified: boolean;
}
