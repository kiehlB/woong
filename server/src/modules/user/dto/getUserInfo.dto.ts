import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CoreResponse } from 'src/common/dto/coreResponse.dto';

@ObjectType()
class UserInfo {
  @Field((type) => Int)
  @IsNotEmpty()
  id: number;
}

@ObjectType()
export class GetUserInfoResponse extends CoreResponse {
  @Field((type) => UserInfo, { nullable: true })
  user?: UserInfo;
}
@ObjectType()
export class GetUsersInfoResponse extends CoreResponse {
  @Field((type) => [UserInfo], { nullable: true })
  users?: UserInfo[];
}

@InputType('getUserInfo')
export class GetUserinfoRequest extends CoreResponse {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;
}
