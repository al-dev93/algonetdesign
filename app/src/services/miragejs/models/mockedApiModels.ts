import { Model, belongsTo, hasMany } from 'miragejs';

import type {
  AccountLink,
  MenuType,
  MockedBoldDetailsSection,
  MockedContactFormInput,
  MockedDeliverable,
  MockedDetailsSection,
  MockedFormInput,
  MockedIndexPageSection,
  MockedProjectData,
  MockedContactFormModal,
  Skill,
  MockedContactFormTooltip,
  MockedErrorMessage,
  ContactMessage,
} from '@/types';

export const models = {
  message: Model.extend<Partial<ContactMessage>>({}),
  account: Model.extend<Partial<AccountLink>>({}),
  menuItem: Model.extend<Partial<MenuType>>({}),
  skill: Model.extend<Partial<Skill>>({}),
  contactFormModal: Model.extend<Partial<MockedContactFormModal>>({
    contactFormInputs: hasMany(),
  }),
  contactFormInput: Model.extend<Partial<MockedContactFormInput>>({
    contactFormModal: belongsTo(),
    formInput: belongsTo(),
    contactFormTooltips: hasMany(),
  }),
  formInput: Model.extend<Partial<MockedFormInput>>({
    contactFormInput: belongsTo(),
    errorMessage: belongsTo(),
  }),
  errorMessage: Model.extend<Partial<MockedErrorMessage>>({
    formInput: belongsTo(),
  }),
  contactFormTooltip: Model.extend<Partial<MockedContactFormTooltip>>({
    contactFormInput: belongsTo(),
  }),
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
};
