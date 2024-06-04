import { Model, belongsTo, hasMany } from 'miragejs';

import type { AccountLink, DetailsSection, IndexPageSection, MenuType } from '@/types';

export const mockedApiModels = {
  account: Model.extend<Partial<AccountLink>>({}),
  menuItem: Model.extend<Partial<MenuType>>({}),
  showcaseSection: Model.extend<Partial<IndexPageSection>>({
    details: hasMany(),
  }),
  detail: Model.extend<Partial<DetailsSection>>({
    section: belongsTo('showcaseSection'),
  }),
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
