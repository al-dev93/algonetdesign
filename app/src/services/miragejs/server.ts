import { createServer } from 'miragejs';
import { mockedApiModels } from './models/mockedApiModels.ts';
import {
  dataAccounts,
  // dataProjects,
  // dataSkills,
  // deliverableAddress,
} from './fixtures/mockedDataAccounts.ts';
import { EncryptedMail } from '@/types';

export function makeServer(encryptedEmail: EncryptedMail, { environment = 'development' } = {}) {
  return createServer({
    environment,
    models: mockedApiModels,
    fixtures: {
      accounts: dataAccounts(encryptedEmail),
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
