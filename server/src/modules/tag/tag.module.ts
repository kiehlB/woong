import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';
import { TagResolver } from './tag.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), AuthModule],
  exports: [TagService],
  providers: [TagService, TagResolver],
})
export class TagModule {}
