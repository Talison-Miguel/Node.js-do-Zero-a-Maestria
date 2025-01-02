const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {

    const items = ["item a", "item b", "item c"]
    
    res.render('dashboard', {items})
})

app.get('/post', (req, res) => {
    const post = {
        title: 'Titulo Node',
        category: 'JS',
        body: 'Descrição do artigo'
    }

    res.render('blogpost', { post })
})

app.get('/', (req, res) => {
    const user = {
        name: 'Matheus',
        surname: 'Battisti',
        age: 30
    }

    const auth = true

    res.render('home', {user, auth})
})

app.listen(3000, () => {
    console.log('Rodando na porta: 3000')
})