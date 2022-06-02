import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostScore } from './PostScore.entity';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(PostScore)
    private readonly followerRepository: Repository<PostScore>,
  ) {}
}
