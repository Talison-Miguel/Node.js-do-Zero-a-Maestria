const express = require('express')
const path = require('path')

const app = express()
const port = 3000
const basePath = path.join(__dirname, 'templates')

const usersRoutes = require('./users')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use(express.static('public'))

app.use('/users', usersRoutes)

app.get('/page2', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.get('/page3', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.use((req, res, next) => {
    res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port, () => {
    console.log('Servidor rodando na porta: ', port)
})

