var express = require('express');
const AuthController = require('../src/controllers/AuthController');
const UserController = require('../src/controllers/UserController');
const NoteController = require('../src/controllers/NoteController');

var router = express.Router();

router.get('/:id/home', AuthController.verifyJWT, UserController.home);

// User configuration
router.post('/create', UserController.create);
router.put('/:id/config', AuthController.verifyJWT, UserController.update);
router.delete('/:id/config', AuthController.verifyJWT, UserController.delete);

// Notes configuration
router.post('/:id/home', AuthController.verifyJWT, NoteController.create);
router.put('/:id/home', AuthController.verifyJWT, NoteController.update);
router.delete('/:id/home', AuthController.verifyJWT, NoteController.delete);

module.exports = router;
