const _ = require('lodash')

const a = [1,2,2,3,4,5]
const b = [1,29,9,9,,9]

const diff = _.difference(a, b)

console.log(diff)