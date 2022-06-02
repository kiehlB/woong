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
import { PostScore } from './PostScore.entity';
import { ScoreService } from './postScore.service';

@Resolver((of) => PostScore)
export class ScoreResolver {
  constructor(private readonly scoreService: ScoreService) {}
}
