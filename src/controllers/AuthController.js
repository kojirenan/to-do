const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let { SECRET } = process.env;

const User = require('../models/User');

module.exports = {
    async login(req, res) {
        try {
            const user = await User.findOne({ where: { email: req.body.email } });
            const checkPassword = await bcrypt.compare(
                req.body.password,
                user.dataValues.password
            );

            if (user === null) {
                return res.status(401).send('Não foi possível encontrar o usuário');
            }

            if (checkPassword) {
                const token = jwt.sign({ id: user.dataValues.id }, SECRET, {
                    expiresIn: 300,
                });
                res.json({ id: user.id, token }).end();
            } else {
                res.status(401).send('Acesso negado');
            }
        } catch {
            res.status(500).send();
        }
    },

    verifyJWT(req, res, next) {
        const token = req.headers['x-access-token'];
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) return res.status(401).end();

            req.id = decoded.id;
            next();
        });
    },
};
