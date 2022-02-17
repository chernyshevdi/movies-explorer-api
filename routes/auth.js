const authRouter = require('express').Router();
const { login, createUser, logout } = require('../controllers/users');
const { createUserValidity, loginValidity } = require('../middlewares/validity');

authRouter.get('/signout', logout);
authRouter.post('/signin', loginValidity, login);
authRouter.post('/signup', createUserValidity, createUser);

module.exports = authRouter;