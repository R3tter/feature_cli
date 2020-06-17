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
  yeild takeLatest(star${name}().type, ${name.toLowerCase()})  
}

export const SomeSagas = [${name.toLowerCase()}Watch];

  `,
  actionSaga: (name) => `
export const set${name}Status = createAction('${name.toLowerCase()}/set/status')
export const set${name}Data = createAction('${name.toLowerCase()}/set/data');
export const set${name}Error = createAction('${name.toLowerCase()}/set/errors);
export const start${name} = createAction('${name.toLowerCase()}/start);
  `,
  actionThunk: (name) => `
import { apiRequest } from 'core/apiRequest';
import { statuses } from 'constants'; 

export const set${name}Status = createAction('${name.toLowerCase()}/set/status')
export const set${name}Data = createAction('${name.toLowerCase()}/set/data');
export const set${name}Error = createAction('${name.toLowerCase()}/set/errors); 
  
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
  `
};
