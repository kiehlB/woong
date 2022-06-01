import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserProfile } from './profile.entity';
import { ProfileResolver } from './profile.resolver';
import { UserProfileService } from './profile.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile])],
  providers: [ProfileResolver, UserProfileService],
  exports: [UserProfileService],
})
export class UserProfileModule {}
