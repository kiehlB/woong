import { IsNotEmpty } from 'class-validator';
import { InputType, Field, Int, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entitiy/user.entity';

@InputType('registerInput')
export class RegisterRequest extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class RegisterResponse {
  @Field(() => Int)
  id: number;

  @Field()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  email_verified: boolean;
}
