import inquirer from 'inquirer';
import chalk from 'chalk';

import { manageFlow } from 'utils';

import { questions } from 'constants';

(async () => {
  const res = await inquirer.prompt(questions);
  await manageFlow(res);
})();
