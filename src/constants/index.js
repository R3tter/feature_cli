export const questions = [
  {
    name: 'name',
    type: 'input',
    message: 'Enter feature name'
  },
  {
    name: 'isActions',
    type: 'confirm',
    message: 'Do you need actions folder ?'
  },
  {
    name: 'middleware',
    type: 'list',
    when: ({ isActions }) => isActions,
    message: 'which middleware you use ?',
    choices: [
      { name: 'saga', value: 'saga' },
      { name: 'thunk', value: 'thunk' }
    ]
  },
  {
    name: 'selectors',
    type: 'confirm',
    message: 'Do you use selectors folder?'
  },
  {
    name: 'reducers',
    type: 'confirm',
    message: 'Do you use reducers folder?'
  },
  {
    name: 'components',
    type: 'confirm',
    message: 'Do you need components folder ?'
  }
];

export const filesContent = {
  actionBase: `import { createAction } from 'redux-actions';\n`,
  sagaBase: (name) => `import { delay, put, takeLatest } from 'redux-saga/effects';
import { start${name} } from '${name}/actions';
    
function* ${name.toLowerCase()} () {
    
}
   
function* ${name.toLowerCase()}Watch () {
  yeild takeLatest(star${name}().type, ${name.toLowerCase()});  
}

export const SomeSagas = [${name.toLowerCase()}Watch];

  `,
  actionSaga: (name) => `
export const set${name}Status = createAction('${name.toLowerCase()}/set/status', (type, status) => ({ type, status }))
export const set${name}Data = createAction('${name.toLowerCase()}/set/data');
export const set${name}Error = createAction('${name.toLowerCase()}/set/errors');
export const start${name} = createAction('${name.toLowerCase()}/start');
  `,
  actionThunk: (name) => `
import { apiRequest } from 'core/apiRequest';
import { statuses } from 'constants'; 

export const set${name}Status = createAction('${name.toLowerCase()}/set/status', (type, status) => ({ type, status }))
export const set${name}Data = createAction('${name.toLowerCase()}/set/data');
export const set${name}Error = createAction('${name.toLowerCase()}/set/errors'); 
  
export const someAction = () => async dispatch => {
  await apiRequest({
      url: 'some',
      method: 'GET', 
      onStart: () => dispatch(set${name}Status('get', statuses.LOADING)),
      onSuccess: data => {
        dispatch(set${name}Status('get', Statuses.SUCCESS));
        dispatch(set${name}Data(data));
      },
      onError: err => {
        dispatch(set${name}Status('get', Statuses.ERROR));
        dispatch(set${name}Error(err));
      }
    }); 
}  
  `,
  reducer: (name) => `import { handleActions } from 'redux-actions';
import { statuses } from 'constants';
import { set${name}Status, set${name}Data, set${name}Error } from '${name}/actions';

const initialState = {
  statuses: {
    get: statuses.none
  },
  data: null
}

export const ${name} = handleActions(
  {
   [set${name}Status]: (state, { payload }) => ({
     ...state,
     statuses: {
      ...state.statuses,
      [payload.type]: payload.status
     }
   }),
   [set${name}Data]: (state, { payload }) => ({
     ...state,
     data: payload
   }),
   [set${name}Error]: (state, { payload }) => ({
     ...state,
     error: payload
   })
  },
  initialState
)
  `,
  selector: (name) => `import { createSelector } from 'reselect';
  
const ${name} = state => state.${name};
  
export const getStatuses = createSelector(${name}, state => state.statuses);
export const getData = createSelector(${name}, state => state.data);
export const getError = createSelector(${name}, state => state.error); 
  `,
  mainJs: (name) => `import React, { memo } from 'react';
import PropsTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import * as styles from './style';

export const ${name} = memo(() => <div className={css(styles.regular.root)}>some content</div>)
  `,
  mainStyles: `import { StyleSheet } from 'aphrodite/no-important';
  
export const regular = StyleSheet.create({
  root: {
    display: 'flex'
  }
})  
  `,
  routeJS: (name) => `import React, { memo } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { css } from 'aphrodite/no-important';

import { routes } from '${name}/routes';
import { routesMapper } from 'core/helpers';
import { getIsAuth } from 'App/selectors';

import * as styles from './style';  

export const ${name} = memo(() => {
  const isAuth = useSelector(getIsAuth);

  return (
    <div className={css(styles.regular.root)}>
      <Switch>
        {routesMapper(routes, isAuth)}
        <Redirect to="/some" />
      </Switch>
    </div>
  );
})
  `,
  routeFile: `
export const routes = [
  {
    path: '/some',
    component: () => null,
    exact: false,
    pageCategory: 'private'
  },
  {
    path: '/other',
    component: () => null,
    exact: false,
    pageCategory: 'private'
  }
];
  
  `
};
