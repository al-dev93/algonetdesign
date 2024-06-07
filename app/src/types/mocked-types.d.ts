import type { BelongsTo, HasMany } from 'miragejs/-types';
import type { DetailsSection, IndexPageSection } from '.';

export type MockedIndexPageSection = IndexPageSection & { detailSections?: HasMany };

export type MockedDetailsSection = DetailSection & { showcaseSection?: BelongsTo };
