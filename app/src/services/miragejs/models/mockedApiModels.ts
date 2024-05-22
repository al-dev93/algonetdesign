import { AccountLink } from '@/types';
import { belongsTo, hasMany, Model, Serializer } from 'miragejs';

export const mockedApiModels = {
  account: Model.extend<Partial<AccountLink>>({}),
  // skill: Model,
  // project: Model.extend({
  //   deliverables: hasMany(),
  // }),
  // deliverable: Model.extend({
  //   project: belongsTo(),
  // }),
};

// export const serializerMockedApi = {
//   project: Serializer.extend({
//     include: ['deliverables'],
//     embed: true,
//   }),
// };
