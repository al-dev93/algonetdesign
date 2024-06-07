import { Model, belongsTo, hasMany } from 'miragejs';

import type { AccountLink, MenuType, MockedDetailsSection, MockedIndexPageSection } from '@/types';

export const mockedApiModels = {
  account: Model.extend<Partial<AccountLink>>({}),
  menuItem: Model.extend<Partial<MenuType>>({}),
  showcaseSection: Model.extend<Partial<MockedIndexPageSection>>({
    detailSections: hasMany(),
  }),
  detailSection: Model.extend<Partial<MockedDetailsSection>>({
    showcaseSection: belongsTo(),
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
