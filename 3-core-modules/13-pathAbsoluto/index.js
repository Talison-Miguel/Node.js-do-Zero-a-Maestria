const path = require('path');


console.log(path.resolve('test.txt'))

const midFolder = 'relatorios'
const fileName = 'talis.txt'

const finalPath = path.join("/", 'arquivos', midFolder, fileName)
console.log(finalPath)