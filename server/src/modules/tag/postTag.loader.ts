import * as DataLoader from 'dataloader';
import { mapFromArray, normalize } from '../../common/utils/normalize';
import PostsTags from './entity/postTag.entity';

import { TagService } from './tag.service';

export function createPostTagsLoader(tagsService: TagService) {
  return new DataLoader<any, any>(async (ids) => {
    const getPostTag = await await tagsService.getUsersByIds(ids);

    const getTags = await await tagsService.getTagByIds();

    const mappedResults = ids.map(
      (id) => getPostTag.filter((e) => e.post_id === id) || null,
    );

    console.log(mappedResults);
    return mappedResults;
  });
}
