import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './modules/user/user.module';
import { ApolloDriver } from '@nestjs/apollo';
import { UserProfileModule } from './modules/profile/profile.module';
import { UserProfile } from './modules/profile/profile.entity';
import { AuthModule } from './modules/auth/auth.module';
import { Auth } from './modules/auth/auth.entity';
import { UserService } from './modules/user/users.service';
import { createUsersLoader } from './modules/user/users.loader';
import { UserProfileService } from './modules/profile/profile.service';
import { createUserProfileLoader } from './modules/profile/profile.loader';

import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { Post } from './modules/post/post.entity';
import { Comments } from './modules/comment/comment.entity';
import SocialUser from './modules/auth/socialUser.entity';
import { User } from './modules/user/entitiy/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        entities: [User, UserProfile, Post, Comments, SocialUser],
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWD'),
        database: configService.get('DB_DATABASE'),
        // url: process.env.CLEARDB_DATABASE_URL,
        synchronize: true,
        autoLoadEntities: true,
        // autoSchemaSync: true,
        // dropSchema: true,
      }),
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [
        UserModule,
        UserProfileModule,
        AuthModule,
        PostModule,
        CommentModule,
        // PostLikeModule,
        // TagModule,
        // ScoreModule,
      ],
      useFactory: (
        usersService: UserService,
        userProfileService: UserProfileService,
      ) =>
        // tagsService: TagService,
        ({
          autoSchemaFile: './schema.gql',
          sortSchema: true,
          playground: true,
          cors: {
            origin: 'http://localhost:3000',
            credentials: true,
          },

          context: (ctx) => ({
            ...ctx,
            usersLoader: createUsersLoader(usersService),
            userProfileLoader: createUserProfileLoader(userProfileService),
          }),
        }),
      inject: [UserService, UserProfileService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
