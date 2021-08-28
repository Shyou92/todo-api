const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/user');
const { NotFound, BadRequest, MongoValidationError } = require('../errors');

const getCurrentUserInfo = (req, res, next) => {
  const _id = req.user;
  User.find({_id})
    .then((user) => {
      if(!user) {
        throw new NotFound('Нет пользователя с таким id');
      }

      return res.status(200).send(user);
    })
    .catch(err => next(err));
};

const createUser = (req, res, next) => {
  const { name, surname, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      surname,
      email,
      password: hash,
    }))
    .then((user) => {
      if(!user) {
        throw new BadRequest('Введите корректные данные');
      }

      const newUser = {
        name: user.name,
        surname: user.surname,
        _id: user._id,
        email: user.email,
      }
      res.send({data: newUser});
    })
    .catch((err) => {
      if (err.code === 11000 && err.name === 'MongoError') {
        next(
          new MongoValidationError(
            'ConflictError. Такой пользователь уже зарегистрирован',
          ),
        );
      } else {
        next(err);
      }
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new BadRequest('Неправильные почта или пароль');
      }

      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '3d',
      });

      res.send({message: token});
    })
    .catch((err) => next(err));
};

const updateUser = (req, res, next) => {
  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  )
  .then((user) => {
    if (!user) {
      throw new BadRequest('Введите корректные данные');
    }
    res.status(200).send(user);
  })
  .catch(err => next(err));
};

module.exports = {
  getCurrentUserInfo,
  createUser,
  loginUser,
  updateUser,
}