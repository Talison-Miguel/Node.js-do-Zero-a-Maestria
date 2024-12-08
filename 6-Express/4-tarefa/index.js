const express = require('express')
const path = require('path')
const app = express()
const port = 5000

const basePath = path.join(__dirname, 'pages')
const projRoutes = require('./projectRoutes')

app.use(express.json())

app.use(express.static('public'))

app.use('/proj', projRoutes)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log('Servidor rodando na porta: ', port)
})