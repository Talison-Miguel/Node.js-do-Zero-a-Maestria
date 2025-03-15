const express = require('express')
const { engine } = require('express-handlebars')

const app = express()

const conn = require('./db/conn')
const Task = require('./models/Task')
const taskRoutes = require('./routes/taskRoutes')

app.engine('handlebars', engine()) // Correção aqui
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true  
    })
)

app.use(express.json())
app.use(express.static('public'))

app.use('/tasks', taskRoutes)

conn.sync()
    .then(() => {
        app.listen(3000)
        console.log('Servidor rodando na porta 3000')
    })
    .catch(err => console.log(err))