import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('followRequest')
export class FollowRequestDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
}
