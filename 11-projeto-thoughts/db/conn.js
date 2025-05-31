const { Sequelize } = require ('sequelize')

const sequelize = new Sequelize('projetoCursoNode', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conectado em: localhost:3000')
} catch(err) {
    console.log(err)
}

module.exports = sequelize