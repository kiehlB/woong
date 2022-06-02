import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Following } from './following.entity';

@Injectable()
export class FollowingService {
  constructor(
    @InjectRepository(Following)
    private readonly followerRepository: Repository<Following>,
  ) {}
}
