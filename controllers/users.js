const mongoose = require('mongoose');
const User = require('../models/user');

const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');

const getCurrentUser = (req, res, next) => {
  console.log(req.user);
  const userId = req.user._id;
  console.log(userId);
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw NotFound(`Пользователь по указанному _id ${userId} не найден. `);
      }
      res.send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  console.log(`на сервере в апдейтЮзер ${req.body}`);
  const { name, email } = req.body;
  console.log(name, email);
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, email }, { runValidators: true, new: true })
    .then((user) => {
      console.log(user);
      if (!user) {
        throw new NotFound(`Пользователь по указанному _id ${userId} не найден. `);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные при обновлении профиля.'));
      } else {
        next(err);
      }
    });
};

module.exports = { getCurrentUser, updateUser };
