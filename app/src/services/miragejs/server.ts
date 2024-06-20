import { createServer } from 'miragejs';

import { boldDetailSections } from './fixtures/mockedBoldDetailsShowcaseSections';
import { accounts } from './fixtures/mockedDataAccounts';
import { menuItems } from './fixtures/mockedDataMenu';
import { projects } from './fixtures/mockedDataProjects';
import { showcaseSections } from './fixtures/mockedDataShowcaseSections';
import { detailSections } from './fixtures/mockedDetailsShowcaseSections';
import { projectDeliverables } from './fixtures/mockedProjectDeliverables';
import { models } from './models/mockedApiModels';
import { serializers } from './serializers/mockedApiSerializers';

import type { EncryptedMail } from '@/types';

/**
 *
 * @description //TODO: add comment
 * @export
 * @param {EncryptedMail} encryptedEmail
 * @param {*} [{ environment = 'development' }={}]
 * @return {*}
 * @al-dev93
 */
export function makeServer(encryptedEmail?: EncryptedMail, { environment = 'development' } = {}) {
  return createServer({
    environment,
    models,
    fixtures: {
      accounts: accounts(encryptedEmail),
      menuItems,
      showcaseSections,
      detailSections,
      boldDetailSections,
      projects,
      projectDeliverables,
    },
    serializers,
    seeds(server) {
      server.loadFixtures();
    },
    routes() {
      this.namespace = 'api';
      this.get('/accounts', (schema) => {
        return schema.all('account');
      });
      this.get('/menuItems', (schema) => {
        return schema.all('menuItem');
      });
      this.get('/showcaseSections', (schema) => {
        return schema.all('showcaseSection');
      });
      this.get('/projects', (schema) => {
        return schema.all('project');
      });
      // this.get('/skills', (schema) => {
      //   return schema.skills.all();
      // });
      // this.get('/projects/:id/deliverables', (schema, request) => {
      //   const project = schema.projects.find(request.params.id);
      //   return project.deliverables;
      // });
    },
  });
}
