const bcrypt = require('bcrypt');
const User = require('../models/User');
const Note = require('../models/Note');

module.exports = {
    async create(req, res) {
        try {
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const newUserEmail = req.body.email;

            const userExists = await User.findOne({ where: { email: newUserEmail } });
            if (userExists == null) {
                const user = await User.create({
                    email: newUserEmail,
                    password: hashedPassword,
                });

                return res.json(user);
            }

            return res.status(400).send('Email já cadastradado');
        } catch {
            return res.status(500).send();
        }
    },

    async update(req, res) {
        try {
            const userId = req.params.id;
            const updatedEmail = req.body.email;
            const updatedPassword = req.body.newPassword;

            const user = await User.findOne({ where: { id: userId } });
            const checkPassword = await bcrypt.compare(
                req.body.password,
                user.dataValues.password
            );

            if (checkPassword) {
                let updateParams = {};

                if (updatedEmail) {
                    updateParams.email = updatedEmail;
                }

                if (updatedPassword) {
                    const updatedHashedPassword = bcrypt.hashSync(
                        req.body.newPassword,
                        10
                    );
                    updateParams.password = updatedHashedPassword;
                }

                await User.update(updateParams, { where: { id: userId } });

                res.send({
                    email: updateParams.email,
                    senha: updateParams.password,
                });
                return res.status(201).end();
            }
            return res.status(401).end();
        } catch {
            return res.status(500).send();
        }
    },

    async delete(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.findOne({ where: { id: userId } });

            const checkPassword = await bcrypt.compare(
                req.body.password,
                user.dataValues.password
            );

            if (checkPassword) {
                await User.destroy({ where: { id: userId } });
                return res.status(201).end();
            }

            return res.status(401).send('Acesso negado');
        } catch {
            return res.status(500).send();
        }
    },

    async home(req, res) {
        try {
            const { id } = req.params;
            const allNotes = await Note.findAll({ where: { user_id: id } });

            return res.json(allNotes).end();
        } catch {
            return res.status(500).send();
        }
    },
};
