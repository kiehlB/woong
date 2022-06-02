import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';

import {
  Resolver,
  Mutation,
  Query,
  Args,
  Directive,
  Context,
  Int,
} from '@nestjs/graphql';
import { User } from '../user/user.entity';
import { Follow } from './follower.entity';
import { FollowerService } from './follower.service';

@Resolver((of) => Follow)
export class FollowerResolver {
  constructor(private readonly followerService: FollowerService) {}
}
