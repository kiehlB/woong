import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { CommentService } from '../comment/comment.service';

@Injectable({ scope: Scope.REQUEST })
export default class PostsLoaders {
  constructor(private usersService: CommentService) {}

  public readonly batchAuthors = new DataLoader(async (authorIds: number[]) => {
    const users = await this.usersService.getUsersByIds(authorIds);

    const usersMap = new Map(users.map((user) => [user.post_id, user]));

    const usersMap2 = users.map((user) => [user.post_id, user]);

    return authorIds.map((authorId) => usersMap.get(authorId));
  });
}
