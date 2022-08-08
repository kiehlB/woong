import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './modules/user/user.module';
import { ApolloDriver } from '@nestjs/apollo';
import { UserProfileModule } from './modules/profile/profile.module';
import { UserProfile } from './modules/profile/profile.entity';
import { AuthModule } from './modules/auth/auth.module';

import { UserService } from './modules/user/users.service';
import { createUsersLoader } from './modules/user/users.loader';
import { UserProfileService } from './modules/profile/profile.service';
import { createUserProfileLoader } from './modules/profile/profile.loader';

import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';

import { Comments } from './modules/comment/comment.entity';
import { User } from './modules/user/entitiy/user.entity';
import { Post } from './modules/post/entitiy/post.entity';
import SocialUser from './modules/auth/entitiy/socialUser.entity';
import PostsTags from './modules/tag/entity/postTag.entity';
import { Tag } from './modules/tag/entity/tag.entity';
import PostRead from './modules/post/entitiy/postRead.entitiy';
import { PostScore } from './modules/post/entitiy/postScore.entity';
import { TagModule } from './modules/tag/tag.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        entities: [
          User,
          UserProfile,
          Post,
          Comments,
          SocialUser,
          PostsTags,
          PostRead,
          PostScore,
          Tag,
        ],
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
        TagModule,
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
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
