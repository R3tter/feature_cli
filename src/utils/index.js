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

const createReducer = async (name) => {
  const baseUrl = `./${name}/reducers`;
  await execa.command(`mkdir ${baseUrl}`);
  await fs.writeFile(`${baseUrl}/index.js`, filesContent.reducer(name), () => null);
};

const createSelector = async (name) => {
  const baseUrl = `./${name}/selectors`;
  await execa.command(`mkdir ${baseUrl}`);
  await fs.writeFile(`${baseUrl}/index.js`, filesContent.selector(name), () => null);
};

const createMainComponent = async (name) => {
  const baseUrl = `./${name}`;
  await fs.writeFile(`${baseUrl}/index.jsx`, filesContent.mainJs(name), () => null);
  await fs.writeFile(`${baseUrl}/style.js`, filesContent.mainStyles, () => null);
};

const createComponents = async (name) => {
  const baseUrl = `./${name}`;
  await execa.command(`mkdir ${baseUrl}/components`);
  await fs.writeFile(`${baseUrl}/index.jsx`, filesContent.routeJS(name), () => null);
  await fs.writeFile(`${baseUrl}/routes.js`, filesContent.routeFile, () => null);
  await fs.writeFile(`${baseUrl}/style.js`, filesContent.mainStyles, () => null);
};

export const manageFlow = async (res) => {
  const { name, isActions, middleware, selectors, reducers, components } = res;
  await createFeature(name);
  isActions && (await createActions(name));
  middleware && (await createMiddleware(name, middleware));
  reducers && (await createReducer(name));
  selectors && (await createSelector(name));
  components ? await createComponents(name) : await createMainComponent(name);
};
