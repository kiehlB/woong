import * as DataLoader from 'dataloader';
import { mapFromArray } from '../../common/utils/normalize';
import { Tag } from './entity/tag.entity';

import { TagService } from './tag.service';

export function createTagsLoader(tagsService: TagService) {
  return new DataLoader<number, Tag>(async (ids) => {
    const users = await tagsService.getTagsByIds(ids);

    const usersMap = mapFromArray(users, (user) => user.id);

    return ids.map((id) => usersMap[id]);
  });
}
