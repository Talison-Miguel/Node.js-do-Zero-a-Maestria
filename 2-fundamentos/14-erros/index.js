const x = '10'

// if(!Number.isInteger(x)) {
//     throw new Error('O valor de x não é um número inteiro :(')
// }

// console.log('Continuando:)')


try {
    x = 2
} catch(err) {
    console.log('Error: ', err)
}