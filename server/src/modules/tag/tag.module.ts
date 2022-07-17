import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TagService } from './tag.service';

import { TagResolver } from './tag.resolver';
import { Tag } from './entity/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), AuthModule],
  exports: [TagService],
  providers: [TagService, TagResolver],
})
export class TagModule {}
