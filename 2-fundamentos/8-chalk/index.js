const chalk = require('chalk')

const nota = 5


if(nota > 7) {
    console.log(chalk.green.bold('Parabéns, Aprovado!!'))
} else {
    console.log(chalk.red.bold('Reprovado!!'))
}