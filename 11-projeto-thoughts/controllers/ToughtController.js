const { where, or } = require('sequelize')
const Toughts = require('../models/Tought')
const User = require('../models/User')

const { Op } = require('sequelize')

module.exports = class ToughtController {
    static async showToughts(req, res) {
        let search = ''
        if(req.query.search) search = req.query.search

        let order = 'DESC'
        if(req.query.order === 'old') order = 'ASC'

        const toughtsData = await Toughts.findAll({
            include: User,
            where: {
                title: {[Op.iLike]: `%${search}%`}
            },
            order: [['createdAt', order]]
        })
        const toughts = toughtsData.map(result => result.get({ plain: true }))

        let toughtsQty = toughts.length
        if(toughtsQty === 0) toughtsQty = undefined

        res.render('toughts/home', { toughts, search, toughtsQty })
    }

    static async dashboard(req, res) {
        const userId = req.session.userId

        const user = await User.findOne({
            where: {
                id: userId
            },
            include: Toughts,
            plain: true
        })

        if(!user) res.redirect('/login')
        const toughts = user.Toughts.map(result => result.dataValues)

        let emptyToughts = false;

        if(toughts.length === 0) {
            emptyToughts = true
        }

        res.render('toughts/dashboard', { toughts, emptyToughts })
        
    }

    static createTought(req, res) {
        res.render('toughts/create')
    }

    static async createToughtSave(req, res) {
        const tought = {
            title: req.body.title,
            UserId: req.session.userId
        }

        try {
            await Toughts.create(tought)

            req.flash('message', 'Pensamento criado com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (err) {
            console.log('Erro: ', err)
        }
    }

    static async updateTought(req, res) {
        const id = req.params.id;
        const tought = await Toughts.findOne({ where: { id: id }, raw: true })

        res.render('toughts/edit', { tought })
    }

    static async updateToughtSave(req, res) {
        const id = req.body.id;
        const tought = {
            title: req.body.title
        }

        try {
            await Toughts.update(tought, { where: { id: id } })

            req.flash('message', 'Pensamento atualizado com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch(err) {
            console.log('Error: ', err)
        }
    }

    static async deleteToughtSave(req, res) {
        const id = req.body.id;
        const UserId = req.session.userId;

        try {
            await Toughts.destroy({ where: { id: id, UserId: UserId } });

            req.flash('message', 'Pensamento removido com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (err) {
            console.log('Erro: ', err)
        }
    }
}
