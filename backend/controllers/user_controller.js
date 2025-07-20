import { Op } from "sequelize";
import User from "../models/user.js";
import bcrypt from "bcrypt";

async function promptUser(req, res) {
    res.render('users/register');
}

async function createUser(req, res) {
    try {
        const password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: password
        });
        res.status(201).json(
            {
                message: "Usuário criado com sucesso",
                user: {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                }
            }
        );
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ message: "Erro ao criar usuário" });
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ message: "Usuário já existe" });
        }
    }
}

async function promptLogin(req, res) {
    res.render('users/login');
}

async function login(req, res) {
    const user = await User.findOne({
        where: {
            [Op.or]: [
                {
                    email: req.body.username_or_email,
                    username: req.body.username_or_email
                }
            ]
        }
    });
    if (user) {
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
            req.session.regenerate(async (err) => {
                req.session.user = user;
                req.app.locals.user = user;
                res.redirect('/');
            });
        }
    } else {
        res.redirect('/users/login');
    }
}

async function logout(req, res) {
    if (req.session && req.session.user) {
        req.app.locals.user = req.session.user;
        next();
    } else {
        req.app.locals.user = null;
        res.redirect('/users/login');
    }
}

export { promptUser, createUser, promptLogin, login, logout };