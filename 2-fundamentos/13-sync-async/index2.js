const fs = require('fs')

console.log('Inicio')

fs.writeFile('arquivo2.txt', 'oi 2', function(err) {
    setTimeout(() => {
        console.log('Arquivo criado.')
    }, 1000)
})

console.log('fim')