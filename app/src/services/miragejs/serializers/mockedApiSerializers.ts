import { Serializer } from 'miragejs';

export const serializerMockedApi = {
  showcaseSection: Serializer.extend({
    include: ['detailSections'],
    embed: true,
    keyForEmbeddedRelationship() {
      return 'content';
    },
  }),
};
