import type { IconType } from '.';

// TODO: add comments
export type AccountLink = {
  id: number;
  service: string;
  icon: IconType;
  onPage?: boolean;
  address?: string;
  iv?: string;
};
