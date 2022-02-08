const userRouter = require('express').Router();
const { getUserInfo, updateUser } = require('../controllers/users');
const {
  updateUserValidity,
} = require('../middlewares/validity');

userRouter.get('/users/me', getUserInfo);
userRouter.patch('/users/me', updateUserValidity, updateUser);

module.exports = userRouter;