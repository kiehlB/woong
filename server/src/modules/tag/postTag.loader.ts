import * as DataLoader from 'dataloader';
import { mapFromArray, normalize } from '../../common/utils/normalize';
import PostsTags from './entity/postTag.entity';

import { TagService } from './tag.service';

export function createPostTagsLoader(tagsService: TagService) {
  return new DataLoader<any, any>(async (ids) => {
    console.log('hello');
    const comments = await await tagsService.getUsersByIds(ids);
    const mappedResults = ids.map(
      (id) => comments.filter((comment) => comment.post_id === id) || null,
    );

    return mappedResults;
  });
}
