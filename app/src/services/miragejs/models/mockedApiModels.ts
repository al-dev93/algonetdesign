import { Model, belongsTo, hasMany } from 'miragejs';

import type {
  AccountLink,
  MenuType,
  MockedBoldDetailsSection,
  MockedDeliverable,
  MockedDetailsSection,
  MockedIndexPageSection,
  MockedProjectData,
} from '@/types';

export const models = {
  account: Model.extend<Partial<AccountLink>>({}),
  menuItem: Model.extend<Partial<MenuType>>({}),
  showcaseSection: Model.extend<Partial<MockedIndexPageSection>>({
    detailSections: hasMany(),
  }),
  detailSection: Model.extend<Partial<MockedDetailsSection>>({
    showcaseSection: belongsTo(),
    boldDetailSections: hasMany(),
  }),
  boldDetailSection: Model.extend<Partial<MockedBoldDetailsSection>>({
    detailSection: belongsTo(),
  }),
  project: Model.extend<Partial<MockedProjectData>>({
    projectDeliverables: hasMany(),
  }),
  projectDeliverable: Model.extend<Partial<MockedDeliverable>>({
    project: belongsTo(),
    account: belongsTo(),
  }),
  // skill: Model,
  // project: Model.extend({
  //   deliverables: hasMany(),
  // }),
};
