import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/user.entity';

@InputType('followRequest')
export class FollowRequestDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
}
