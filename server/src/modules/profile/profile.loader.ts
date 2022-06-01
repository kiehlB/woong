import * as DataLoader from 'dataloader';
import { mapFromArray } from 'src/common/utils/normalize';
import { UserProfile } from './profile.entity';
import { UserProfileService } from './profile.service';

export function createUserProfileLoader(
  userProfileService: UserProfileService,
) {
  return new DataLoader<number, UserProfile>(async (ids) => {
    const users = await userProfileService.getUsersByIds(ids);

    const usersMap = mapFromArray(users, (user) => user.id);

    return ids.map((id) => usersMap[id]);
  });
}
