import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';

@InputType('createProfile')
export class CreateProfileRequest {
  @Field()
  @IsString()
  bio: string;
}
