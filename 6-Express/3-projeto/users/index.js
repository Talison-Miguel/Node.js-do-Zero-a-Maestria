const express = require('express')
const router = express.Router()
const path = require('path')

const basePath = path.join(__dirname, '../templates')

router.get('/add', (req, res) => {
    res.sendFile(`${basePath}/userForm.html`)
})

router.post('/save', (req, res) => {
    const name = req.body.name
    const age = req.body.age

    console.log('Nome: ', name)
    console.log('Idade: ', age)

    res.sendFile(`${basePath}/userForm.html`)
})

router.get('/:id', (req, res) => {
    const id = req.params.id

    console.log('Estamos buscando pelo user: ', id)

    res.sendFile(`${basePath}/users.html`)
})

module.exports = router