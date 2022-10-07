import * as DataLoader from 'dataloader';
import { mapFromArray } from '../../common/utils/normalize';

import { User } from './entitiy/user.entity';

import { UserService } from './users.service';

function normalize<T>(
  array: T[],
  selector: (item: T) => string | number = (item: any) => item.id,
) {
  const object: {
    [key: string]: T;
  } = {};
  array.forEach((item) => {
    object[selector(item)] = item;
  });
  return object;
}

export function createUsersLoader(usersService: UserService) {
  return new DataLoader<number, User>(async (ids) => {
    const users = await usersService.getUsersByIds(ids);

    const normalized = normalize(users, (user) => user.id);

    const mappedResults = ids.map(
      (id) => (users as any).filter((user) => user.id === id) || null,
    );

    return mappedResults;
  });
}
