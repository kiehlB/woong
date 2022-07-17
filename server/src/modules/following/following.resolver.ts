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
import { Following } from './following.entity';
import { FollowingService } from './following.service';

@Resolver((of) => Following)
export class FollowingResolver {
  constructor(private readonly followerService: FollowingService) {}
}
