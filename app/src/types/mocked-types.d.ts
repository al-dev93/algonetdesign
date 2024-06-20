import type { Deliverable, DetailSection, IndexPageSection, ProjectData } from '.';
import type { BelongsTo, HasMany } from 'miragejs/-types';

export type MockedIndexPageSection = IndexPageSection & { detailSections?: HasMany<string> };

export type MockedDetailsSection = DetailSection & {
  showcaseSection?: BelongsTo<string>;
  boldDetailSections?: HasMany<string>;
};

export type MockedBoldDetailsSection = DetailSection & { detailSection?: BelongsTo<string> };

export type MockedProjectData = ProjectData & { projectDeliverables?: HasMany<string> };

export type MockedDeliverable = Deliverable & { project?: BelongsTo<string>; account?: BelongsTo<string> };
