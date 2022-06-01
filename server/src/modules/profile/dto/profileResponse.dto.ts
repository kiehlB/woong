import {
  Field,
  ID,
  InputType,
  Int,
  IntersectionType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class ProfileResponse {
  @Field(() => Int)
  id: number;

  @Field()
  bio: string;
}
