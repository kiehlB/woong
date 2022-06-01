import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './user.entity';
import { CurrentUser, TokenUser } from '../../decorator/auth-user.decorator';
import {
  GetUserinfoRequest,
  GetUserInfoResponse,
  GetUsersInfoResponse,
} from './dto/getUserInfo.dto';
import { RegisterRequest, RegisterResponse } from './dto/register.dto';
import { JwtAuthGuard } from '../auth/guards/graphql-passport-auth.guard';
import { UserProfileService } from '../profile/profile.service';
import { UserProfile } from '../profile/profile.entity';
import DataLoader from 'dataloader';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly usersService: UserService,
  ) {}

  @Query(() => GetUserInfoResponse)
  @UseGuards(JwtAuthGuard)
  async whoAmI(@CurrentUser() user: TokenUser): Promise<GetUserInfoResponse> {
    return { ok: true, user };
  }

  @Query(() => [User], { nullable: true })
  async getAllUser() {
    const users = await this.usersService.getAllUser();

    return users;
  }

  @Query(() => GetUserInfoResponse)
  async getUser(
    @Args('input') input: GetUserinfoRequest,
  ): Promise<GetUserInfoResponse> {
    const user = await this.usersService.getSingleUser(input);
    return { ok: true, user };
  }

  @Mutation(() => RegisterResponse)
  async register(
    @Args('input') user: RegisterRequest,
  ): Promise<RegisterResponse> {
    const saveUser = await this.usersService.createUser(user);

    return saveUser;
  }

  @ResolveField('profile', (retruns) => UserProfile, { nullable: true })
  async getUserProfile(
    @Parent() user: User,
    @Context('userProfileLoader')
    userProfileLoader: DataLoader<number, UserProfile>,
  ) {
    const { id } = user;

    return userProfileLoader.load(id);
  }
}
