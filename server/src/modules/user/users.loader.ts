import * as DataLoader from 'dataloader';
import { mapFromArray } from 'src/common/utils/normalize';

import { User } from './user.entity';
import { UserService } from './users.service';

export function createUsersLoader(usersService: UserService) {
  return new DataLoader<number, User>(async (ids) => {
    const users = await usersService.getUsersByIds(ids);

    const usersMap = mapFromArray(users, (user) => user.id);

    console.log(ids.map((id) => usersMap[id]));
    return ids.map((id) => usersMap[id]);
  });
}
