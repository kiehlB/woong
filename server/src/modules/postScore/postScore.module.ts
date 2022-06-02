import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { PostScore } from './PostScore.entity';
import { ScoreResolver } from './postScore.resolver';
import { ScoreService } from './postScore.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostScore]), AuthModule, UserModule],
  providers: [ScoreService, ScoreResolver],
})
export class ScoreModule {}
