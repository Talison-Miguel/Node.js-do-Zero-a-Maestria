import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';

operation();

function operation() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer?',
            choices: [
                'Criar Conta',
                'Consultar Saldo',
                'Depositar',
                'Sacar',
                'Sair',
            ],
        }])
        .then((answers) => {
            console.log(chalk.green(`Você escolheu: ${answers.action}`));
        })
        .catch((err) => console.log(chalk.red(err)));
}
