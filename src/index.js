import inquirer from 'inquirer';
import chalk from 'chalk';

import { questions } from 'constants';

(async () => {
  const res = await inquirer.prompt(questions);
  console.log(res);
})();
