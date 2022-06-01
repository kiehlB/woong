import { ObjectType, InputType, PickType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/modules/user/user.entity';

@InputType('InputSignin')
export class SigninRequest extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class SigninResponse {
  @IsNotEmpty()
  @Field((type) => String)
  token: string;
}
