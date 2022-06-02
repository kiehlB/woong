import {
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  PickType,
} from '@nestjs/graphql';

@InputType()
export class FindTagRequest {
  @Field()
  label: string;

  @Field()
  value: string;
}
