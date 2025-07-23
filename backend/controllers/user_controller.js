import { Op } from "sequelize";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
            password: password,
            permsId: req.body.permsId || 2
        });
        res.status(201).json(
            {
                message: "Usuário criado com sucesso",
                user: {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    permsId: user.permsId
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
    try {
        const username = req.body.username_or_email;
        const password = req.body.password;

        if (!username || !password) {
            return res.status(400).json({ message: "Usuário e senha são obrigatórios" });
        }

        const user = await User.findOne({
            where: { [Op.or]: [{ email: username }, { username: username }] }
        }); 

        if (!user) {
            return res.status(404).json({ message: "Credenciais inválidas." });
        }

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        const token = jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email
        },
            'chave-secreta',
            { expiresIn: '1h' }
        );
        res.status(200).json({
            message: "Login realizado com sucesso",
            token: token
        });
    } catch (error) {
        console.error("Erro ao realizar login:", error);
        res.status(500).json({ message: "Erro ao realizar login" });
    }
}

// async function login(req, res) {
//     const user = await User.findOne({
//         where: {
//             [Op.or]: [
//                 {
//                     email: req.body.username_or_email,
//                     username: req.body.username_or_email
//                 }
//             ]
//         }
//     });
//     if (user) {
//         const result = await bcrypt.compare(req.body.password, user.password);
//         if (result) {
//             req.session.regenerate(async (err) => {
//                 req.session.user = user;
//                 req.app.locals.user = user;
//                 res.redirect('/');
//             });
//         }
//     } else {
//         res.redirect('/users/login');
//     }
// }

async function logout(req, res) {
    if (req.session && req.session.user) {
        req.app.locals.user = req.session.user;
        next();
    } else {
        req.app.locals.user = null;
        res.redirect('/users/login');
    }
}

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar dados do usuário." });
  }
};

export { promptUser, createUser, promptLogin, login, logout, getUserProfile };