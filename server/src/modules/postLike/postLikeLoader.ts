import * as DataLoader from 'dataloader';
import { mapFromArray } from '../../common/utils/normalize';
import { PostLike } from './postLike.entity';
import { PostLikeService } from './postLike.service';

export function createPostLikeLoader(PostLikeService: PostLikeService) {
  return new DataLoader<number, PostLike[]>(async (ids) => {
    const PostLike = await PostLikeService.getUsersByIds(ids);

    const mappedResults = ids.map(
      (id) => PostLike.filter((like) => like.post_id === id) || null,
    );

    return mappedResults;
  });
}
