const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login( req, res ) {
        res.render('auth/login')
    }

    static async loginPost( req, res ) {
        const { email, password } = req.body;

        //find user
        const user = await User.findOne({ where: { email: email } })

        if(!user) {
            req.flash('message', 'Usuário não encontrado!')
            res.render('auth/login')
            return
        }

        //check if passwords match
        const passwordMatch = bcrypt.compareSync(password, user.password)
        if(!passwordMatch) {
            req.flash('message', 'Senha invalida!')
            res.render('auth/login')
            return
        }

        req.session.userId = user.id
        req.flash('message', 'Login realizado com sucesso!')
        req.session.save(() => {
            res.redirect('/')
        }) 
    }

    static register( req, res ) {
        res.render('auth/register')
    }

    static async registerPost( req, res ) {
        const { name,email,password,confirmpassword } = req.body;

        console.log(password)
        console.log(confirmpassword)
        // password match validation
        if(password !== confirmpassword) {

            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('auth/register')
            return
        }

        const checkifUserExists = await User.findOne({ where: { email: email } })
        if(checkifUserExists) {
            req.flash('message', 'O e-mail já está em uso!')
            res.render('auth/register')
            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try {
            const createdUser = await User.create(user)

            req.session.userId = createdUser.id
            req.flash('message', 'Cadastro realizado com sucesso!')
            req.session.save(() => {
                res.redirect('/')
            }) 

        } catch(err) {
            console.log(err)
        }
    }

    static async logout( req, res ) {
        req.session.destroy()
        res.redirect('/login')
    }
}