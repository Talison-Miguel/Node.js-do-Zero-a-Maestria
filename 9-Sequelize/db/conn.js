const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

// try {
//     sequelize.authenticate()
//     console.log('Conectamos com sucesso com o sequelize!')
// } catch(err) {
//     console.log('Erro ao conectar!')
//     console.log(err)
// }

module.exports = sequelize