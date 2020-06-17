import fs from 'fs';
import execa from 'execa';

import { filesContent } from 'constants';

const createFeature = async (name) => {
  await execa.command(`mkdir ${name}`);
};

const createActions = async (name) => {
  await execa.command(`mkdir ./${name}/actions`);
  await fs.writeFile(`./${name}/actions/index.js`, filesContent.actionBase, () => null);
};

const createMiddleware = async (name, middleware) => {
  switch (middleware) {
    case 'saga': {
      const baseUrl = `./${name}/sagas`;
      await execa.command(`mkdir ${baseUrl}`);
      await fs.writeFile(`${baseUrl}/index.js`, filesContent.sagaBase(name), () => null);
      await fs.appendFile(`./${name}/actions/index.js`, filesContent.actionSaga(name), () => null);
      break;
    }
    case 'thunk': {
      const baseUrl = `./${name}/actions`;
      await fs.appendFile(`${baseUrl}/index.js`, filesContent.actionThunk(name), () => null);
      break;
    }
  }
};

export const manageFlow = async (res) => {
  const { name, isActions, middleware, selectors, reducers, components } = res;
  await createFeature(name);
  isActions && (await createActions(name));
  middleware && (await createMiddleware(name, middleware));
};
