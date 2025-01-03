const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({
    partialsDir: ['view/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

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

app.get("/blog", (req, res) => {
    const posts = [
        {
            title: 'Aprender Node.JS',
            category: 'JS',
            body: 'corpo do texto',
            comments: 4,
        },
        {
            title: 'Aprender PHP',
            category: 'JS',
            body: 'corpo do texto',
            comments: 8,
        },
        {
            title: 'Aprender PY',
            category: 'JS',
            body: 'corpo do texto',
            comments: 2,
        },
    ]

    res.render("blog", {posts})
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