const express = require('express');
const { engine } = require('express-handlebars');
const mysql = require('mysql');

const app = express();

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// Configuração do Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/books/insertbook', (req, res) => {
    
    const title = req.body.title;
    const pageqty = req.body.pageqty;

    const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`

    conn.query(sql, (err => {
        if(err) console.log(err)

        res.redirect('/books')
    }))
});

app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books'

    conn.query(sql, (err, data) => {
        if(err) {
            console.log(err)
            return
        }

        const books = data
        console.log(books)

        res.render('books', { books })
    })
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql',
});

app.get('/books/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE id = ${id}`

    conn.query(sql, (err, data) => {
        if(err) {
            console.log(err)
            return
        }

        const book = data[0]

        res.render('book', { book })
    })
})

conn.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Conectado ao MySQL');
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
});
