import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from './follower.entity';

@Injectable()
export class FollowerService {
  constructor(
    @InjectRepository(Follow)
    private readonly followerRepository: Repository<Follow>,
  ) {}
}
