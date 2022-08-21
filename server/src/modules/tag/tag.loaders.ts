import * as DataLoader from 'dataloader';
import { mapFromArray } from '../../common/utils/normalize';
import PostsTags from './entity/postTag.entity';
import { Tag } from './entity/tag.entity';

import { TagService } from './tag.service';

export function createTagsLoader(tagsService: TagService) {
  return new DataLoader<number, PostsTags[]>(async (ids) => {
    const comments = await await tagsService.getUsersByIds(ids);

    const mappedResults = ids.map(
      (id) => comments.filter((comment) => comment.post_id === id) || null,
    );

    return mappedResults;
  });
}
