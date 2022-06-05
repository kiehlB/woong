import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  Resolver,
  Mutation,
  Query,
  Args,
  Context,
  Info,
} from '@nestjs/graphql';
import { UserProfile } from './profile.entity';
import { UserProfileService } from './profile.service';
import { User } from '../user/user.entity';
import { JwtAuthGuard } from '../auth/guards/graphql-passport-auth.guard';
import { CurrentUser, TokenUser } from 'src/decorator/auth-user.decorator';
import { CreateProfileRequest } from './dto/createProfile.dto';
import { ProfileResponse } from './dto/profileResponse.dto';

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: UserProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ProfileResponse)
  async createAndUpdateProfile(
    @CurrentUser() user: TokenUser,
    @Args('input') bio: CreateProfileRequest,
  ) {
    const saveProfile = await this.profileService.createAndUpdateProfile(
      user,
      bio,
    );

    return saveProfile;
  }
}
