const User = require('../models/User');
const Note = require('../models/Note');

module.exports = {
    async create(req, res) {
        try {
            const user_id = req.params.id;
            const { title, description = '', date } = req.body;
            let noteObj = {};

            noteObj.user_id = user_id;
            noteObj.title = title;
            noteObj.description = description;
            noteObj.done = false;
            if (date != undefined) noteObj.date = date;

            const note = await Note.create(noteObj);

            return res.json(note);
        } catch {
            return res.status(500).send();
        }
    },

    async update(req, res) {
        try {
            const { id, title, description, date, done = false } = req.body;

            let noteObj = {};

            if (title) noteObj.title = title;
            if (description) noteObj.description = description;
            if (date) noteObj.date = date;

            noteObj.done = done;

            const note = await Note.update(noteObj, { where: { id } });

            return res.json(note);
        } catch {
            return res.status(500).send();
        }
    },

    async delete(req, res) {
        try {
            const noteId = req.body.id;
            await Note.destroy({ where: { id: noteId } });

            res.send('Nota excluída');
        } catch {
            return res.status(500).send();
        }
    },
};
