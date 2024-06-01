import { createServer } from 'miragejs';

import { mockedApiModels } from './models/mockedApiModels.ts';

import { dataAccounts } from './fixtures/mockedDataAccounts.ts';
import { dataMenu } from './fixtures/mockedDataMenu.ts';

import { EncryptedMail } from '@/types';
import { dataShowcaseSections } from './fixtures/mockedDataShowcaseSections.ts';

export function makeServer(encryptedEmail: EncryptedMail, { environment = 'development' } = {}) {
  return createServer({
    environment,
    models: mockedApiModels,
    fixtures: {
      accounts: dataAccounts(encryptedEmail),
      menuItems: dataMenu,
      showcaseSections: dataShowcaseSections,
    },
    // serializers: serializerMockedApi,
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
      // this.get('/skills', (schema) => {
      //   return schema.skills.all();
      // });
      // this.get('/projects', (schema) => {
      //   return schema.projects.all();
      // });
      // this.get('/projects/:id/deliverables', (schema, request) => {
      //   const project = schema.projects.find(request.params.id);
      //   return project.deliverables;
      // });
    },
  });
}
