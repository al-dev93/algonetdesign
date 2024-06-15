import { Serializer } from 'miragejs';

export const serializers = {
  showcaseSection: Serializer.extend({
    include: ['detailSections'],
    embed: true,
    keyForEmbeddedRelationship() {
      return 'content';
    },
  }),
  project: Serializer.extend({
    serialize(object) {
      const json = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        projects: object.models.map((project: any) => {
          const { attrs } = project;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          attrs.deliverables = project.projectDeliverables.models.map((projectDeliverable: any) => {
            const deliverableAttrs = projectDeliverable.attrs;
            deliverableAttrs.service = projectDeliverable.account.attrs.service;
            deliverableAttrs.address = `${projectDeliverable.account.attrs.address}${deliverableAttrs.path}`;
            deliverableAttrs.icon = projectDeliverable.account.attrs.icon;
            return deliverableAttrs;
          });
          return attrs;
        }),
      };
      return json;
    },
  }),
};
