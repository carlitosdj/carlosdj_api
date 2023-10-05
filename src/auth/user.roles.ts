import { RolesBuilder } from 'nest-access-control';

export enum UserRoles {
  admin = 'admin',
  producer = 'producer',
  consumer = 'consumer',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(UserRoles.consumer)
  .readOwn(['user'])
  .createOwn(['user'])
  .updateOwn(['user'])
  .deleteOwn(['user'])

  .grant(UserRoles.producer)
  .extend(UserRoles.consumer)

  .grant(UserRoles.admin)
  .extend(UserRoles.producer)
  .readAny(['user'])
  .createAny(['user'])
  .updateAny(['user'])
  .createAny(['user'])
  .deleteAny(['user']);
