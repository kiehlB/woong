import * as DataLoader from 'dataloader';
import { Post } from '../post/entitiy/post.entity';
import { Comments } from './comment.entity';
import { CommentService } from './comment.service';

export function createCommentsLoader(userProfileService: CommentService) {
  return new DataLoader<number, Comments[]>(async (ids) => {
    const comments = await await userProfileService.getUsersByIds(ids);
    const mappedResults = ids.map(
      (id) => comments.filter((comment) => comment.post_id === id) || null,
    );

    return mappedResults;
  });
}
