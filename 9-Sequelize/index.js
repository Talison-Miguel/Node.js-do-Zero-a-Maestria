const express = require('express');
const { engine } = require('express-handlebars'); 
const conn = require('./db/conn');
const User = require('./models/User');
const Adress = require('./models/Adress');

const app = express();

// Configuração de middleware
app.use(express.urlencoded({ extended: true })); // Para lidar com dados de formulários
app.use(express.json()); // Para processar JSON
app.use(express.static('public')); // Servir arquivos estáticos

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views'); 

// Página para criar um novo usuário
app.get('/users/create', (req, res) => {
    res.render('adduser'); 
});

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne({raw: true, where: {id: id}})

    res.render('home', { user })
})
app.get('/users/edit/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findOne({include: Adress, where: {id: id}})
        
        res.render('useredit', {user: user.get({ plain: true})})
    } catch(err) {
        console.log(err)
    }

})

app.post('/address', async (req, res) => {
    try {
        const { street, number, city, userId } = req.body

        // Verifica se o usuário existe
        const user = await User.findByPk(userId)
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        // Cria o endereço vinculado ao usuário
        const address = await Adress.create({ street, number, city, UserId: userId })

        return res.status(201).json(address)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

app.delete('/address/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica se o endereço existe
        const address = await Adress.findByPk(id);
        if (!address) {
            return res.status(404).json({ message: 'Endereço não encontrado' });
        }

        // Deleta o endereço
        await address.destroy();

        return res.status(200).json({ message: 'Endereço deletado com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


app.get('/users/delete/:id', async (req, res) => {
    const id = req.params.id;

    await User.destroy({raw: true, where: {id: id}})

    res.redirect('/')
})

app.get('/api/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findOne({
            where: { id: id },
            include: [{ model: Adress }] 
        });

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar usuário", error: error.message });
    }
});


app.delete('/api/users/:id', async (req, res) => {
    const id = req.params.id;

    await User.destroy({raw: true, where: {id: id}})

    res.status(200).send(`Usuário de ID: ${id} apagado com sucesso!`);
})

// Página inicial que lista todos os usuários
app.get('/', async (req, res) => {
    try {
        const users = await User.findAll({ raw: true });
        console.log(users)
        console.log(users)
        res.render('home', { users }); 
    } catch (error) {
        res.status(500).send('Erro ao carregar a página inicial.');
    }
});

// Rota para salvar um novo usuário enviado pelo formulário (Handlebars)
app.post('/users/create', async (req, res) => {
    try {
        const { name, occupation, newsletter } = req.body;

        if (!name || !occupation) {
            return res.status(400).send('Os campos "name" e "occupation" são obrigatórios.');
        }

        await User.create({
            name,
            occupation,
            newsletter: newsletter === 'on', 
        });

        res.redirect('/'); 
    } catch (error) {
        res.status(500).send('Erro ao criar usuário. Tente novamente.');
    }
});

// API: Obter todos os usuários
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{ model: Adress }]
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários.', details: error.message });
    }
});

// API: Criar um novo usuário via JSON
app.post('/api/users/create', async (req, res) => {
    try {
        const { name, occupation, newsletter } = req.body;

        if (!name || !occupation) {
            return res.status(400).json({ error: 'Os campos "name" e "occupation" são obrigatórios.' });
        }

        const user = await User.create({
            name,
            occupation,
            newsletter: newsletter || false,
        });

        res.status(201).json({ message: 'Usuário criado com sucesso!', user });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o usuário.', details: error.message });
    }
});

app.post('/users/edit/:id', async (req, res) => {
    const id = req.body.id; 
    const name = req.body.name; 
    const occupation = req.body.occupation; 
    let newsletter = req.body.newsletter; 

    if(newsletter === 1) {
        newsletter == true
    } else {
        newsletter = false
    }

    const userData = {
        id,
        name,
        occupation,
        newsletter
    }

    await User.update(userData, {where: {id: id}})

    res.redirect('/')
})

//Editar um novo usuário via json
app.patch('/api/users/:id', async (req, res) => {
    const id = req.params.id; 
    const { newId, name, occupation, newsletter } = req.body; 

    try {
        const updatedUser = await User.update(
            { id: newId || id, name, occupation, newsletter }, 
            { where: { id: id } } 
        );

        if (updatedUser[0] === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado ou nada foi alterado.' });
        }

        const user = await User.findOne({ raw: true, where: { id: newId || id } });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar o usuário.' });
    }
});


// Conexão com o banco de dados e inicialização do servidor
conn
    .sync()
    // .sync({ force: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch((err) => console.log(err));
