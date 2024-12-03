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
            if(answers.action === 'Criar Conta') {
                createAccount()
            } else if(answers.action === 'Depositar') {
                deposit()
            } else if(answers.action === 'Consultar Saldo') {
                getAccountBalance()
            } else if(answers.action === 'Sacar') {
                withDraw()
            } else if(answers.action === 'Sair') {
                console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
                process.exit()
            }
        })
        .catch((err) => console.log(chalk.red(err)));
}


function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))

    buildAccount()
}

function buildAccount() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite um nome para a sua conta:'
    }]).then(answers => {
        const accountName = answers.accountName

        console.info(accountName)

        if(!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome'))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', (err) => {
            console.log(err)
        })

        console.log(chalk.green('Parabéns a sua conta foi criada :)'))
        operation()
    }).catch(err => {
        console.log(err)
    })
}

function deposit() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }]).then((answer) => {
        const accountName = answer.accountName
        if(!checkAccount(accountName)) {
            return deposit()
        }

        inquirer.prompt([{
            name: 'amount',
            message: 'Quanto você deseja depositar'
        }]).then((answer) => {
            const amount = answer.amount

            addAmount(accountName, amount)
            operation()
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

function checkAccount(accountName) {
    if(!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'))
        return false
    }
    return true
}

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if(!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente!'))
        return deposit()
    }
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(`accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err) {
            console.log(err)
        }
    )

    console.log(chalk.green('Foi depositado o valor de R$', amount, ' na sua conta!'))
    console.log(chalk.green('O valor total da conta é ', accountData.balance))
}

function getAccount(accountName) {
    const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })

    return JSON.parse(accountJson)
}

function getAccountBalance() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }]).then((answer) => {
        const accountName = answer.accountName

        if(!checkAccount(accountName)) {
            return(getAccountBalance())
        }

        const accountData = getAccount(accountName)
        console.log(chalk.green.bgWhite(' O saldo da sua conta é ', accountData.balance, ' '))
        operation()
    })
    .catch(err => console.log(err))
}

function withDraw() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }]).then((answer) => {
        const accountName = answer.accountName

        if(!checkAccount(accountName)) {
            return withDraw()
        }

        inquirer.prompt([{
            name: 'amount',
            message: 'Quanto você deseja sacar?'
        }]).then(answer => {
            const amount = answer.amount
            
            removeAmount(accountName, amount)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

function removeAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if(!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente!'))
        return withDraw()
    }

    if(accountData.balance < amount) {
        console.log(chalk.bgRed.black('Valor indisponível!'))
        return withDraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err) {
            console.log(err)
        }
    )

    console.log(chalk.green('Foi realizado um saque de R$', amount, ' da sua conta.'))
    operation()
}