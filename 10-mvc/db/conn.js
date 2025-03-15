const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodemvc2', 'root', '', {
    host: 'localhost', 
    dialect: 'mysql'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Rodando em localhost://3000');
    } catch (err) {
        console.error('Erro ao conectar:', err);
    }
})();

module.exports = sequelize; 
