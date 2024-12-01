import inquirer from 'inquirer';
import chalk from 'chalk';

const log = console.log;

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Qual é o seu nome?',
  },
  {
    type: 'input',
    name: 'age',
    message: 'Qual é a sua idade?',
    validate: (input) => {
      if (isNaN(input) || input <= 0) {
        log(chalk.red('Digite uma idade válida!', chalk.underline.bgWhite('|*__*|')));
        return 'Por favor, insira um número.'; 
      }
      return true; 
    },
  },
];

inquirer.prompt(questions)
  .then((answers) => {
    log(`Olá, ${answers.name}! Você tem ${answers.age} anos.`);
    log(chalk.green('Finalizado corretamente!', chalk.underline.bgWhite('|<0__0>|')));
  })
  .catch((error) => {
    log(chalk.red("Erro ao receber as informações:", error));
  });
