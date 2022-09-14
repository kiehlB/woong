import { Global, Module } from '@nestjs/common';
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
import { createTagsLoader } from './modules/tag/tag.loaders';
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
import { createPostTagsLoader } from './modules/tag/postTag.loader';
import { TagService } from './modules/tag/tag.service';
import { CommentService } from './modules/comment/comment.service';
import { createCommentsLoader } from './modules/comment/comments.loader';
import { PostLike } from './modules/postLike/postLike.entity';
import { PostLikeModule } from './modules/postLike/postLike.module';
import { PostLikeService } from './modules/postLike/postLike.service';
import { createPostLikeLoader } from './modules/postLike/postLikeLoader';

export const typeOrmConnectionDataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWD,
  database: process.env.DB_DATABASE,
  synchronize: false,
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
    PostLike,
  ],
});

@Global()
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
          PostLike,
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
        PostLikeModule,

        // PostLikeModule,

        // ScoreModule,
      ],
      useFactory: (
        usersService: UserService,
        userProfileService: UserProfileService,
        tagsService: TagService,
        commentsService: CommentService,
        postLikeService: PostLikeService,
      ) => ({
        autoSchemaFile: './schema.gql',
        sortSchema: true,
        playground: true,
        cors: {
          origin: process.env.ORIGIN,
          credentials: true,
        },

        context: (ctx) => ({
          ...ctx,
          usersLoader: createUsersLoader(usersService),
          postTagLoader: createPostTagsLoader(tagsService),
          postLikeLoader: createPostLikeLoader(postLikeService),
          userProfileLoader: createUserProfileLoader(userProfileService),
          commentsLoader: createCommentsLoader(commentsService),
        }),
      }),
      inject: [
        UserService,
        UserProfileService,
        TagService,
        CommentService,
        PostLikeService,
      ],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        await typeOrmConnectionDataSource.initialize();
        return typeOrmConnectionDataSource;
      },
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
