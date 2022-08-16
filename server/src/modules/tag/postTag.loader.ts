import * as DataLoader from 'dataloader';
import { mapFromArray, normalize } from '../../common/utils/normalize';
import PostsTags from './entity/postTag.entity';

import { TagService } from './tag.service';

export function createPostTagsLoader(tagsService: TagService) {
  return new DataLoader<any, any>(async (ids) => {
    const AllPostTag = await tagsService.getPostTagsByIds(ids);

    const AllPostTagMap = mapFromArray(AllPostTag, (user) => user.id);

    return ids.map((id) => AllPostTagMap[id]);
  });
}
