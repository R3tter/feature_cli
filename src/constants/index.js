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
