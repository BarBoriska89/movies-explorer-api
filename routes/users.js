const userRouter = require('express').Router();

const { updateUserValidation } = require('../middlewares/validation');
const {
  updateUser, getCurrentUser,
} = require('../controllers/users');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', updateUserValidation, updateUser);

module.exports = userRouter;
